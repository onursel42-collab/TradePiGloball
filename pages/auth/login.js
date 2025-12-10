import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Layout from "../../components/Layout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Giriş başarılı, yönlendiriliyorsun…");
      // TODO: rol'e göre yönlendirme. Şimdilik ana sayfa:
      window.location.href = "/";
    }
  }

  return (
    <Layout title="Giriş Yap">
      <div className="card">
        <h1>Giriş Yap</h1>
        <p className="sub">
          TradePiGlobal paneline erişmek için e-posta ve şifrenle giriş yap.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <label>
            E-posta
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@firma.com"
            />
          </label>

          <label>
            Şifre
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="msg error">{error}</p>}
          {success && <p className="msg success">{success}</p>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
          </button>
        </form>

        <p className="bottom-text">
          Hesabın yok mu?{" "}
          <a href="/auth/register-seller">Satıcı kaydı</a> veya{" "}
          <a href="/auth/register-buyer">Alıcı kaydı</a>
        </p>
      </div>

      <style jsx>{`
        .card {
          margin-top: 40px;
          background: #ffffff;
          border-radius: 16px;
          padding: 20px 18px 24px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
        }
        h1 {
          margin: 0 0 4px;
          font-size: 22px;
          color: #111827;
        }
        .sub {
          margin: 0 0 16px;
          font-size: 13px;
          color: #6b7280;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        label {
          font-size: 13px;
          color: #374151;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        input {
          border-radius: 10px;
          border: 1px solid #d1d5db;
          padding: 8px 10px;
          font-size: 14px;
        }
        .btn {
          margin-top: 4px;
          border-radius: 999px;
          border: none;
          background: #10b981;
          color: #022c22;
          font-weight: 600;
          padding: 8px 14px;
          font-size: 14px;
          cursor: pointer;
        }
        .btn:disabled {
          opacity: 0.7;
          cursor: default;
        }
        .msg {
          font-size: 12px;
          margin: 0;
        }
        .msg.error {
          color: #b91c1c;
        }
        .msg.success {
          color: #047857;
        }
        .bottom-text {
          margin-top: 16px;
          font-size: 12px;
          color: #6b7280;
        }
        .bottom-text a {
          color: #10b981;
        }
      `}</style>
    </Layout>
  );
}
