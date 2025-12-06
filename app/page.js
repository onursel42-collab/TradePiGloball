import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <div className="card">
        <span className="badge">TradePiGlobal • B2B</span>
        <h1>Pi ile toptan ticaret platformuna hoş geldin 🚀</h1>
        <p>
          Satıcılar ve alıcılar için, Pi Network temelli basit ve güvenli bir
          B2B altyapı. İlk adım: hesabını oluştur ve giriş yap.
        </p>

        <div className="actions">
          <Link href="/auth" className="btn-primary">
            Giriş / Kayıt Ol
          </Link>

          <a
            href="https://supabase.com"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            Supabase Paneli
          </a>
        </div>
      </div>
    </main>
  );
}
