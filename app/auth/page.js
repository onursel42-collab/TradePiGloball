'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const signIn = async () => {
    setErr(null);
    setMsg(null);

    if (!email) {
      setErr('Lütfen e-posta yaz 😅');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Magic link tıklandığında döneceği URL
        emailRedirectTo: 'https://tradepigloball.co/auth',
      },
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setErr('Bir hata oluştu: ' + error.message);
    } else {
      setMsg('Giriş linki e-postana gönderildi ✅');
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <h1>Giriş Yap / Kayıt Ol</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 8, marginRight: 8, marginTop: 16, minWidth: 260 }}
      />

      <button
        onClick={signIn}
        disabled={!email || loading}
        style={{ padding: '8px 16px' }}
      >
        {loading ? 'Gönderiliyor...' : 'Giriş Linki Gönder'}
      </button>

      {err && (
        <p style={{ color: 'red', marginTop: 16 }}>
          {err}
        </p>
      )}

      {msg && (
        <p style={{ color: 'green', marginTop: 16 }}>
          {msg}
        </p>
      )}
    </div>
  );
        }
