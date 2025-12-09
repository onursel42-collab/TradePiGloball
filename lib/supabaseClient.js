import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL="https://gndyovpbppnjwicfetnf.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZHlvdnBicHBuandpY2ZldG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODk5MTcsImV4cCI6MjA4MDQ2NTkxN30.1_IAX8FVlvuTFp1ZhQZb-IaaPxfM3Mq4Rquj6to5EfU  ";

if (!supabaseUrl || !supabaseKey) {
  // Konsola uyarı – prod'da sıkıntı olmasın diye
  console.warn("Supabase env değişkenleri eksik!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
