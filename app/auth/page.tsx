import { createClient } from '@/lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState("");

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({ email });
    console.log(data, error);
    alert("Mail gönderildi!");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Giriş Yap / Kayıt Ol</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={signIn}>Giriş Linki Gönder</button>
    </div>
  );
}
