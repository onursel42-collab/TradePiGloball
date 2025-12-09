import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        setError(error.message);
      } else {
        setProduct(data);
      }
    }

    loadProduct();
  }, [id]);

  if (!id) {
    return (
      <div className="tpg-container tpg-section">
        <p className="tpg-section-sub">Ürün ID bekleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tpg-container tpg-section">
        <h1 className="tpg-section-title">Hata oluştu</h1>
        <p className="tpg-section-sub">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="tpg-container tpg-section">
        <p className="tpg-section-sub">Ürün yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="tpg-container tpg-section">
      <h1 className="tpg-section-title">{product.name}</h1>
      <p className="tpg-section-sub">{product.category}</p>

      <div className="tpg-card" style={{ marginTop: 16 }}>
        <p>{product.description || "Açıklama henüz eklenmemiş."}</p>
      </div>
    </div>
  );
}
