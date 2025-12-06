"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // { type: 'ok' | 'error', text: string }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password
        });

        if (error) throw error;

        setMsg({
          type: "ok",
          text: "Kayıt başarılı! Lütfen e-posta kutunu kontrol et."
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        setMsg({
          type: "ok",
          text: "Giriş başarılı! Ana sayfaya yönlendiriliyorsun..."
        });

        setTimeout(() => {
          router.push("/");
        }, 800);
      }
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="card">
        <span className="badge">
          {mode === "login" ? "Giriş Yap" : "Yeni Üyelik"}
        </span>
        <h2>TradePiGlobal hesabın</h2>
        <p>
          Aynı hesapla hem satıcı hem alıcı olarak işlem yapabileceksin. Şimdilik
          basit e-posta + şifre ile ilerliyoruz.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            className="input"
            type="email"
            placeholder="E-posta adresin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Şifre (min 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="actions">
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading
                ? "İşleniyor..."
                : mode === "login"
                ? "Giriş Yap"
                : "Kayıt Ol"}
            </button>

            <button
              className="btn-secondary"
              type="button"
              onClick={() => {
                setMsg(null);
                setMode(mode === "login" ? "signup" : "login");
              }}
            >
              {mode === "login"
                ? "Hesabın yok mu? Kayıt ol"
                : "Hesabın var mı? Giriş yap"}
            </button>
          </div>
        </form>

        {msg && (
          <p className={`message ${msg.type === "error" ? "error" : "ok"}`}>
            {msg.text}
          </p>
        )}
      </div>
    </main>
  );
}
