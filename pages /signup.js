import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function SignupPage() {
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }
      }
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMsg(
      "Kayıt oluşturuldu. E-posta doğrulama linkini kontrol et. (Supabase Auth)."
    );
  }

  return (
    <div className="tpg-container tpg-section">
      <div className="tpg-card" style={{ maxWidth: 460, margin: "0 auto" }}>
        <h1 className="tpg-section-title">Yeni Hesap Oluştur</h1>
        <p className="tpg-section-sub" style={{ marginBottom: 16 }}>
          Buyer (alıcı) veya Seller (tedarikçi) rolünü seç.
        </p>

        <form className="tpg-form" onSubmit={handleSignup}>
          <select
            className="tpg-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="buyer">Buyer (Alıcı)</option>
            <option value="seller">Seller (Satıcı / Üretici)</option>
          </select>

          <input
            className="tpg-input"
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="tpg-input"
            type="password"
            placeholder="Şifre (min 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div style={{ color: "#fca5a5", fontSize: 13 }}>{error}</div>
          )}
          {msg && (
            <div style={{ color: "#4ade80", fontSize: 13 }}>{msg}</div>
          )}

          <button
            className="tpg-btn tpg-btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Kaydediliyor..." : "Kayıt Ol"}
          </button>
        </form>
      </div>
    </div>
  );
}
