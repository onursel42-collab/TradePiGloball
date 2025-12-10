// src/services/adminService.js
import { supabase } from '../lib/supabaseClient';

// Tüm satıcıları firma ve plan bilgisi ile listele
export async function getAllSellers() {
  const { data, error } = await supabase
    .from('sellers')
    .select(`
      id,
      user_id,
      status,
      created_at,
      companies (
        name,
        country,
        city
      ),
      membership_plans (
        name,
        price_monthly,
        currency
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Satıcı durumunu değiştir (pending / approved / suspended vs.)
export async function updateSellerStatus(sellerId, status) {
  const { error } = await supabase
    .from('sellers')
    .update({ status })
    .eq('id', sellerId);

  if (error) throw error;
  return true;
}
