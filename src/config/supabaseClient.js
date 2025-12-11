import { createClient } from "@supabase/supabase-js";

// Render ortam değişkenlerinden Supabase bilgilerini alıyoruz
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Güvenlik kontrolü
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("❌ Supabase environment variables missing!");
}

// Backend için service role key ile tam yetkili client
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);
