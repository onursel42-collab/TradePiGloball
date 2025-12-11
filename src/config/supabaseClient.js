// src/config/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// Supabase projenden Render ortam değişkenlerine eklediğin keyleri okuyoruz
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Basit güvenlik doğrulaması
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("❌ Supabase environment variables missing!");
}

// Global Supabase client (tam yetkili service role)
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log("✅ Supabase client initialized (service role)");
