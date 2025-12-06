'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOtp({
        email,
        // İstersen Supabase Auth → Redirect URL ayarına göre bırakabiliriz.
        // emailRedirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        console.error(error);
        setError(error.message ?? 'Bir hata oluştu.');
      } else {
        setMessage(
          'Giriş linki e-posta adresine gönderildi (Supabase ayarlarına bağlı).'
        );
      }
    } catch (err) {
      console.error(err);
      setError('Beklenmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Satıcı Girişi</h1>

      <p className="subtitle">
        TradePi Global satıcı paneline giriş yapmak için e-posta adresini gir.
      </p>

      <form onSubmit={handleSubmit} className="card form">
        <label htmlFor="email">E-posta adresi</label>
        <input
          id="email"
          type="email"
          required
          placeholder="ornek@firma.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Gönderiliyor…' : 'Giriş linki gönder'}
        </button>

        {message && <p className="small-text" style={{ color: '#22c55e' }}>{message}</p>}
        {error && <p className="small-text" style={{ color: '#f97373' }}>{error}</p>}
      </form>

      <p className="small-text">
        Not: Magic link’in çalışması için Supabase projesinde e-posta sağlayıcısı
        ve redirect URL ayarlarının yapılmış olması gerekiyor.
      </p>
    </main>
  );
          }
