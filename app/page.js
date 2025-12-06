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
        .select(`
          id,
          title,
          description,
          price_info,
          currency_hint,
          min_order,
          vendors (
            company_name,
            country,
            city,
            whatsapp,
            contact_email
          )
        `)
        .eq('status', 'active')
        .limit(50);

      if (error) console.error(error);
      else setProducts(data || []);

      setLoading(false);
    }

    load();
  }, []);

  return (
    <div style={{ padding: '32px 20px', maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>
        TradePiGlobal — Üretici & Alıcı B2B Köprüsü 🌍
      </h1>
      <p style={{ color: '#9ca3af', marginBottom: 32 }}>
        Burada sadece satıcıyla alıcıyı buluşturuyoruz. Ödeme, anlaşma, kontrat
        tamamen sizin aranızda. Biz aracı değiliz.
      </p>

      {loading && <p>Ürünler yükleniyor...</p>}

      {!loading && products.length === 0 && (
        <p>Henüz aktif ürün yok. Supabase üzerinden ürün ekleyebilirsin.</p>
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
              borderRadius: 16,
              border: '1px solid #1f2933',
              padding: 16,
              background:
                'linear-gradient(145deg, rgba(15,23,42,1), rgba(17,24,39,1))',
            }}
          >
            <h3 style={{ fontSize: 18, marginBottom: 6 }}>{p.title}</h3>
            <p
              style={{
                fontSize: 13,
                color: '#9ca3af',
                marginBottom: 8,
                minHeight: 40,
              }}
            >
              {p.description || 'No description.'}
            </p>
            <p style={{ fontSize: 13, marginBottom: 4 }}>
              <strong>Price:</strong> {p.price_info || 'Negotiable'}{' '}
              {p.currency_hint && `(${p.currency_hint})`}
            </p>
            {p.min_order && (
              <p style={{ fontSize: 13, marginBottom: 4 }}>
                <strong>Min order:</strong> {p.min_order}
              </p>
            )}

            {p.vendors && (
              <div style={{ fontSize: 12, marginTop: 8 }}>
                <div style={{ color: '#e5e7eb' }}>
                  {p.vendors.company_name}
                </div>
                <div style={{ color: '#9ca3af' }}>
                  {p.vendors.country}{' '}
                  {p.vendors.city && `(${p.vendors.city})`}
                </div>
                <div style={{ marginTop: 4 }}>
                  {p.vendors.whatsapp && (
                    <div>WhatsApp: {p.vendors.whatsapp}</div>
                  )}
                  {p.vendors.contact_email && (
                    <div>E-mail: {p.vendors.contact_email}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
              }
