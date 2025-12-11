// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

/**
 * ENV DEĞERLERİ (.env dosyasına yaz)
 *
 * SUPABASE_URL=https://xxxx.supabase.co
 * SUPABASE_ANON_KEY=...
 * SUPABASE_SERVICE_ROLE_KEY=...
 *
 * Backend tarafında service role kullanıyoruz ki RLS'e takılmayalım.
 */

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    '[Supabase] SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY eksik. .env dosyanı kontrol et.'
  )
  process.exit(1)
}

// Backend için service key ile client
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
