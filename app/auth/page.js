'use client';

import { useState } from 'react';
import { createClient } from '../../lib/supabaseClient';

const supabase = createClient();

export default function AuthPage() {
  const [email, setEmail] = useState('');

  const signIn = async () => {
    if (!email) {
      alert('Lütfen e-posta yaz ✉️');
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      // istersen buradan özel redirect verebilirsin
      // options: { emailRedirectTo: 'https://www.tradepigloball.co/auth' },
    });

    if (error) {
      console.error(error);
      alert('Bir hata oluştu: ' + error.message);
      return;
    }

    alert('Giriş linki e-postana gönderildi ✅');
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Giriş Yap / Kayıt Ol</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 8, marginRight: 8 }}
      />
      <button onClick={signIn} disabled={!email}>
        Giriş Linki Gönder
      </button>
    </div>
  );
}
