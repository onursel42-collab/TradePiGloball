import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function RFQPage() {
  const [values, setValues] = useState({
    product_name: "",
    quantity: "",
    country: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    // Supabase table (örnek): rfq_requests
    const { error } = await supabase.from("rfq_requests").insert({
      product_name: values.product_name,
      quantity: values.quantity,
      country: values.country,
      notes: values.notes
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMsg("RFQ talebin kaydedildi. Satıcılar teklif verecek.");
      setValues({ product_name: "", quantity: "", country: "", notes: "" });
    }
  }

  return (
    <div className="tpg-container tpg-section">
      <h1 className="tpg-section-title">RFQ Talebi Oluştur</h1>
      <p className="tpg-section-sub" style={{ marginBottom: 16 }}>
        Tek bir form ile birden fazla satıcıdan fiyat teklifi iste.
      </p>

      <div className="tpg-card" style={{ maxWidth: 620 }}>
        <form className="tpg-form" onSubmit={handleSubmit}>
          <input
            name="product_name"
            className="tpg-input"
            placeholder="Ürün / kategori adı"
            value={values.product_name}
            onChange={handleChange}
            required
          />
          <input
            name="quantity"
            className="tpg-input"
            placeholder="Tahmini miktar (ör. 10.000 adet)"
            value={values.quantity}
            onChange={handleChange}
          />
          <input
            name="country"
            className="tpg-input"
            placeholder="Teslim ülkesi"
            value={values.country}
            onChange={handleChange}
          />
          <textarea
            name="notes"
            className="tpg-textarea"
            rows={4}
            placeholder="Teknik detaylar, hedef fiyat, teslim süresi vb."
            value={values.notes}
            onChange={handleChange}
          />

          {error && (
            <div style={{ color: "#fca5a5", fontSize: 13 }}>{error}</div>
          )}
          {msg && <div style={{ color: "#4ade80", fontSize: 13 }}>{msg}</div>}

          <button
            className="tpg-btn tpg-btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Gönderiliyor..." : "RFQ Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}
