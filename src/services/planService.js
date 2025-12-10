// src/services/planService.js
import { supabase } from '../lib/supabaseClient';

// Tüm aktif paketleri getir
export async function getActivePlans() {
  const { data, error } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

// Tek bir plan
export async function getPlanById(id) {
  const { data, error } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Satıcı paketleri – şimdilik tüm aktif planları döndürüyoruz.
// İleride tabloya "segment / role / type" kolonu ekleyip burada filtreleriz.
export async function getSellerPlans() {
  const plans = await getActivePlans();

  const filtered = plans.filter((plan) => {
    const tag =
      plan.segment ||
      plan.target_role ||
      plan.role ||
      plan.type ||
      plan.category ||
      null;

    if (!tag) return true; // tag yoksa şimdilik satıcı kabul et
    const value = String(tag).toLowerCase();
    return value.includes('seller') || value.includes('satıcı');
  });

  return filtered.length ? filtered : plans;
}

// Alıcı paketleri – şu an muhtemelen yok, o yüzden genelde boş dönecek.
// İleride tabloyu güncelleyince burayı da değiştiririz.
export async function getBuyerPlans() {
  const plans = await getActivePlans();

  const filtered = plans.filter((plan) => {
    const tag =
      plan.segment ||
      plan.target_role ||
      plan.role ||
      plan.type ||
      plan.category ||
      null;

    if (!tag) return false;
    const value = String(tag).toLowerCase();
    return value.includes('buyer') || value.includes('alıcı');
  });

  return filtered;
}
