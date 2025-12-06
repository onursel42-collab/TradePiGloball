// app/page.js
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(
          `
          id,
          title,
          description,
          price_info,
          currency_hint,
          vendors (
            id,
            company_name,
            country,
            city
          )
        `
        )
        .eq('status', 'active')
        .limit(20);

      if (error) {
        console.error('Ürünleri çekerken hata:', error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    load();
  }, []);

  return (
    <div style={{ padding: '32px 20px', maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>
        Tanrı üstü B2B alt yapı çalışıyor kanka 🚀
      </h1>
      <p style={{ color: '#9ca3af', marginBottom: 32 }}>
        TradePiGlobal — Üreticiler & alıcılar için global B2B buluşma noktası.
        Ödemeler doğrudan satıcı-alıcı arasında, biz sadece köprü oluyoruz.
      </p>

      {loading && <p>Ürünler yükleniyor...</p>}

      {!loading && products.length === 0 && (
        <p>Henüz aktif ürün yok. Admin panelden ekleyebilirsin.</p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: '1px solid #1f2933',
              borderRadius: 16,
              padding: 16,
              background:
                'linear-gradient(145deg, rgba(15,23,42,1), rgba(17,24,39,1))',
            }}
          >
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>{p.title}</h3>
            <p
              style={{
                fontSize: 13,
                color: '#9ca3af',
                marginBottom: 8,
                minHeight: 40,
              }}
            >
              {p.description || 'No description'}
            </p>
            <p style={{ fontSize: 13, marginBottom: 8 }}>
              <strong>Price:</strong> {p.price_info || 'Negotiable'}{' '}
              {p.currency_hint ? `(${p.currency_hint})` : ''}
            </p>
            {p.vendors && (
              <p style={{ fontSize: 12, color: '#9ca3af' }}>
                {p.vendors.company_name} — {p.vendors.country}{' '}
                {p.vendors.city && `(${p.vendors.city})`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}    
