import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gndyovpbppnjwicfetnf.supabase.co"
const supabaseAnonKey = "ANON_KEY_BURAYA"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZHlvdnBicHBuandpY2ZldG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODk5MTcsImV4cCI6MjA4MDQ2NTkxN30.1_IAX8FVlvuTFp1ZhQZb-IaaPxfM3Mq4Rquj6to5EfU ;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
