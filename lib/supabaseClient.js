import { createClient } from '@supabase/supabase-js'

// .env / Render environment değişkenleri
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Uygulama genelinde kullanacağımız client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
