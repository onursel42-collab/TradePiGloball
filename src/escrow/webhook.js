import express from "express";
import crypto from "crypto";
import { supabase } from "../supabaseclient.js";

export const escrowWebhookRouter = express.Router();

// Escrow.com webhook signature doğrulama için RAW body lazım.
// Bu yüzden bu router'a özel raw parser:
escrowWebhookRouter.use(
  express.raw({ type: "*/*" }) // provider JSON gönderse bile raw yakalar
);

// Sabit time compare
function safeEqual(a, b) {
  const aBuf = Buffer.from(a || "", "utf8");
  const bBuf = Buffer.from(b || "", "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

// Signature doğrulama (Escrow.com dokümanına göre uyarlayacağız)
// Şimdilik generic HMAC-SHA256: hex/base64 farkı varsa logdan bakarız.
function verifySignature(rawBody, headerSig, secret) {
  if (!secret) return false;
  if (!headerSig) return false;

  // Bazı providerlar "sha256=...." formatı kullanır
  const sig = headerSig.includes("=") ? headerSig.split("=").pop() : headerSig;

  const hmacHex = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const hmacB64 = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");

  return safeEqual(sig, hmacHex) || safeEqual(sig, hmacB64);
}

escrowWebhookRouter.post("/", async (req, res) => {
  const rawBody = req.body; // Buffer
  const secret = process.env.ESCROW_WEBHOOK_SECRET;

  // Escrow.com hangi header ile yolluyor? (sende hangisi geliyorsa onu kullan)
  const headerSig =
    req.get("x-escrow-signature") ||
    req.get("x-signature") ||
    req.get("x-webhook-signature");

  // 1) Signature verify
  if (!verifySignature(rawBody, headerSig, secret)) {
    return res.status(401).json({ ok: false, error: "invalid_signature" });
  }

  // 2) JSON parse
  let payload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch (e) {
    return res.status(400).json({ ok: false, error: "invalid_json" });
  }

  // 3) Minimum alanlar (provider’a göre uyarlayacağız)
  const provider = process.env.ESCROW_PROVIDER || "escrow.com";
  const transactionId =
    payload?.transaction_id ||
    payload?.transactionId ||
    payload?.transaction?.id;

  const event =
    payload?.event ||
    payload?.type ||
    payload?.name;

  if (!transactionId || !event) {
    // Eksikse bile 200 dönmek bazen daha iyi (provider retry spam yapmasın)
    return res.status(200).json({ ok: true, skipped: "missing_fields" });
  }

  // 4) Webhook event kaydet (duplicate gelirse unique constraint yakalayacağız)
  const { error: insErr } = await supabase
    .from("escrow_webhook_events")
    .insert([{
      provider,
      transaction_id: Number(transactionId),
      event: String(event),
      payload
    }]);

  if (insErr) {
    // Duplicate event ise: 200 dön (provider tekrar basmasın)
    // Postgres unique violation: 23505
    if (insErr.code === "23505") {
      return res.status(200).json({ ok: true, duplicate: true });
    }

    // Diğer hatalar: logla ama 200 de dönebiliriz (isteğe bağlı)
    console.error("webhook insert error:", insErr);
    return res.status(500).json({ ok: false, error: "db_insert_failed" });
  }

  // 5) Burada istersen “event -> escrow status sync” çağırırız (service_role RPC ile)
  // Şimdilik sadece kayıt: güvenli + idempotent.

  return res.status(200).json({ ok: true });
});
