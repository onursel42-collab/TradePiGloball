import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Layout from "../../components/Layout";

export default function RegisterSellerPage() {
  const [form, setForm] = useState({
    company: "",
    fullName: "",
    email: "",
    password: "",
    sector: "",
    country: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          role: "seller",
          company_name: form.company,
          full_name: form.fullName,
          sector: form.sector,
          country: form.country,
          city: form.city,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "Satıcı hesabın oluşturuldu. E-posta doğrulamasından sonra panel açılacak."
      );
    }
  }

  return (
    <Layout title="Satıcı Kaydı">
      <div className="card">
        <h1>Satıcı olarak kayıt ol</h1>
        <p className="sub">
          Ürünlerini listelemek ve global alıcılardan RFQ almak için satıcı
          hesabı oluştur.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Üretici / Şirket adı
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Ör: Alpha Electronics"
              required
            />
          </label>

          <label>
            Ad &amp; Soyad
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Adın Soyadın"
              required
            />
          </label>

          <label>
            Ana sektör
            <input
              name="sector"
              value={form.sector}
              onChange={handleChange}
              placeholder="Ör: Elektronik & IoT"
            />
          </label>

          <label>
            E-posta
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ornek@firma.com"
              required
            />
          </label>

          <label>
            Şifre
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="En az 8 karakter"
              required
            />
          </label>

          <div className="row">
            <label>
              Ülke
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Ülkeni yaz"
              />
            </label>
            <label>
              Şehir
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="İl / Şehir"
              />
            </label>
          </div>

          {error && <p className="msg error">{error}</p>}
          {success && <p className="msg success">{success}</p>}

          <button className="btn" disabled={loading}>
            {loading ? "Kayıt oluşturuluyor…" : "Satıcı kaydını tamamla"}
          </button>
        </form>

        <p className="bottom-text">
          Zaten hesabın var mı? <a href="/auth/login">Giriş yap</a>
        </p>
      </div>

      <style jsx>{`
        .card {
          margin-top: 32px;
          background: #ffffff;
          border-radius: 16px;
          padding: 20px 18px 24px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
        }
        h1 {
          margin: 0 0 4px;
          font-size: 20px;
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
        .row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
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
        @media (max-width: 480px) {
          .row {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </Layout>
  );
                }
