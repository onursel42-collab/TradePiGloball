'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Buraya sonra Supabase ile gerçek login ekleyeceğiz
    alert('Şimdilik demo ekran 🙂 Supabase auth birazdan bağlanacak.');
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

        <button type="submit" className="button">
          Giriş linki gönder (demo)
        </button>
      </form>

      <p className="small-text">
        Bu ekran şimdilik taslak. Bir sonraki adımda Supabase ile gerçek giriş
        & kayıt akışını bağlayacağız.
      </p>
    </main>
  );
}
