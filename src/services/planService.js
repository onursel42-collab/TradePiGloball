// src/services/planService.js
import { supabase } from '../lib/supabaseClient';

export async function getActivePlans() {
  const { data, error } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getPlanById(id) {
  const { data, error } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
