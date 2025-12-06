'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function VendorApplyPage() {
  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    whatsapp: '',
    country: '',
    city: '',
    product_focus: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const submit = async () => {
    if (!form.company_name || !form.email) {
      alert('Şirket adı ve e-posta zorunlu');
      return;
    }

    setSending(true);

    const { error } = await supabase.from('vendor_requests').insert({
      ...form,
    });

    if (error) {
      console.error(error);
      alert('Bir hata oluştu: ' + error.message);
    } else {
      setDone(true);
    }

    setSending(false);
  };

  if (done) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Başvurun alındı ✅</h1>
        <p style={{ marginTop: 8 }}>
          En kısa sürede değerlendireceğiz. Uygun görürsek Supabase üzerinden
          seni aktif vendor listesinden ekleyeceğiz.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h1>Vendor Başvurusu</h1>
      <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 24 }}>
        Üretici / tedarikçiysen, burayı doldur; seni listemize ekleyelim.
      </p>

      {[
        ['company_name', 'Şirket Adı *'],
        ['contact_name', 'İlgili Kişi'],
        ['email', 'E-posta *'],
        ['whatsapp', 'WhatsApp / Telefon'],
        ['country', 'Ülke'],
        ['city', 'Şehir'],
        ['product_focus', 'Ana Ürün / Kategori'],
      ].map(([key, label]) => (
        <div key={key} style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>
            {label}
          </label>
          <input
            value={form[key]}
            onChange={handleChange(key)}
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 8,
              border: '1px solid #4b5563',
              background: '#020617',
              color: '#f9fafb',
            }}
          />
        </div>
      ))}

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>
          Detaylı Açıklama
        </label>
        <textarea
          value={form.message}
          onChange={handleChange('message')}
          rows={4}
          style={{
            width: '100%',
            padding: 8,
            borderRadius: 8,
            border: '1px solid #4b5563',
            background: '#020617',
            color: '#f9fafb',
          }}
        />
      </div>

      <button
        onClick={submit}
        disabled={sending}
        style={{
          padding: '8px 16px',
          borderRadius: 999,
          border: 'none',
          background: '#22c55e',
          color: '#022c22',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {sending ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
      </button>
    </div>
  );
                   }
