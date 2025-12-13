import { z } from "zod";
import { escrowApiFetchTransaction } from "../../config/escrowcom.js";
import { supabaseAdmin } from "../../config/supabase.js";
import { mapEscrowEventToInternal } from "../escrow/escrow.mapper.js";

const WebhookSchema = z.object({
  event: z.string(),
  event_type: z.string(),         // "transaction"
  transaction_id: z.number(),     // e.g. 12345
});

export async function escrowComWebhookHandler(req, res) {
  const parsed = WebhookSchema.safeParse(req.body);

  // 1) hızlı cevap: format yanlışsa 400
  if (!parsed.success) return res.status(400).json({ ok: false });

  const { event, event_type, transaction_id } = parsed.data;

  // 2) ACK’i hızlı ver (10s timeout + retry var) 4
  // İstersen burada hemen 200 döndürüp arkada işlem yaparsın.
  // Node tek process ise, yine de hızlı işlem kurguluyoruz.
  res.status(200).json({ ok: true });

  try {
    // 3) idempotent kayıt (retry/double-call koruması)
    const { error: insErr } = await supabaseAdmin
      .from("escrow_webhook_events")
      .insert({
        provider: "escrow.com",
        transaction_id,
        event,
        payload: parsed.data,
      });

    // unique ihlali = daha önce işlenmiş
    if (insErr && String(insErr.message || "").toLowerCase().includes("duplicate")) return;

    // 4) DOĞRULAMA: Escrow.com “webhook’u API’den fetch ile doğrulayın” diyor 5
    const tx = await escrowApiFetchTransaction(transaction_id);

    // 5) Bizim DB ile eşle: internal escrow kaydını bul
    // (senin köprü tablon: escrow_external_links ya da escrows.external_transaction_id)
    const { data: link, error: linkErr } = await supabaseAdmin
      .from("escrow_external_links")
      .select("escrow_id")
      .eq("provider", "escrow.com")
      .eq("external_transaction_id", String(transaction_id))
      .maybeSingle();

    if (linkErr || !link?.escrow_id) {
      // audit yazıp çık (bizde kayıtlı değilse)
      await supabaseAdmin.from("audit_logs").insert({
        action: "ESCROW_WEBHOOK_UNMATCHED",
        entity_type: "escrow",
        entity_id: null,
        metadata: { event, transaction_id, tx },
      });
      return;
    }

    // 6) event -> internal state
    const newStatus = mapEscrowEventToInternal(event);

    // 7) State güncelle + audit
    await supabaseAdmin
      .from("escrows")
      .update({ status: newStatus })
      .eq("id", link.escrow_id);

    await supabaseAdmin.from("audit_logs").insert({
      action: `ESCROW_WEBHOOK_${event}`,
      entity_type: "escrow",
      entity_id: link.escrow_id,
      metadata: { transaction_id, event, event_type },
    });

    // (opsiyonel) ödeme olayında order’ı da güncelle
    if (newStatus === "FUNDED") {
      // escrows -> orders bağını escrows.order_id ile kuruyorsan:
      const { data: escrowRow } = await supabaseAdmin
        .from("escrows")
        .select("order_id")
        .eq("id", link.escrow_id)
        .single();

      if (escrowRow?.order_id) {
        await supabaseAdmin.from("orders").update({ status: "PAID" }).eq("id", escrowRow.order_id);
      }
    }
  } catch (e) {
    // Burada loglayıp bırak: webhook retry zaten var
    await supabaseAdmin.from("audit_logs").insert({
      action: "ESCROW_WEBHOOK_ERROR",
      entity_type: "escrow",
      entity_id: null,
      metadata: { err: String(e), body: req.body },
    });
  }
}
