import { useState } from "react";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="tpg-container tpg-section">
      <div className="tpg-card" style={{ maxWidth: 420, margin: "0 auto" }}>
        <h1 className="tpg-section-title">Giriş Yap</h1>
        <p className="tpg-section-sub" style={{ marginBottom: 16 }}>
          Buyer veya Seller hesabınla panele giriş yap.
        </p>

        <form className="tpg-form" onSubmit={handleLogin}>
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
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <div style={{ color: "#fca5a5", fontSize: 13 }}>{error}</div>
          )}
          <button
            className="tpg-btn tpg-btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
