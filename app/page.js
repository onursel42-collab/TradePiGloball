'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('products')
        .select('id, title, description, price, status')
        .eq('status', 'active')
        .limit(20);

      if (error) {
        console.error('Ürünleri çekerken hata:', error);
        setProducts([]);
      } else {
        setProducts(data ?? []);
      }

      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 20px',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>
          TradePi Global
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.8 }}>
          Tanrı üstü B2B altyapı çalışıyor kanka 🚀
        </p>
      </header>

      {loading ? (
        <p>Ürünler yükleniyor...</p>
      ) : products.length === 0 ? (
        <p>Henüz aktif ürün yok.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>
                {p.title}
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  opacity: 0.8,
                  marginBottom: '8px',
                }}
              >
                {p.description}
              </p>
              <p
                style={{
                  fontWeight: 'bold',
                  marginTop: '8px',
                }}
              >
                {p.price} Pi
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
