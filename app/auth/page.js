// app/auth/page.js
'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const signIn = async () => {
    if (!email) {
      alert('Lütfen e-posta yaz ✉️');
      return;
    }

    setSending(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://tradepigloball.co/auth', // istersen render URL
      },
    });

    if (error) {
      console.error(error);
      setMessage('Bir hata oluştu: ' + error.message);
    } else {
      setMessage('Giriş linki e-postana gönderildi ✅');
    }

    setSending(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Giriş Yap / Kayıt Ol</h1>
      <p style={{ fontSize: 14, marginBottom: 12 }}>
        E-posta ile magic link gönderiyoruz. Owner, vendor, herkes aynı endpoint.
      </p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: 8,
          marginRight: 8,
          borderRadius: 8,
          border: '1px solid #4b5563',
          background: '#020617',
          color: '#f9fafb',
        }}
      />
      <button
        onClick={signIn}
        disabled={!email || sending}
        style={{
          padding: '8px 16px',
          borderRadius: 999,
          border: 'none',
          background: '#f97316',
          color: '#111827',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {sending ? 'Gönderiliyor...' : 'Giriş Linki Gönder'}
      </button>
      {message && (
        <p style={{ marginTop: 16, fontSize: 14, color: '#9ca3af' }}>
          {message}
        </p>
      )}
    </div>
  );
}
