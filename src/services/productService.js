// src/services/productService.js
import { supabase } from '../lib/supabaseClient';
import { getCurrentUserWithSeller } from './sellerService';

/**
 * Giriş yapan kullanıcının satıcı ürünleri
 */
export async function getMyProducts() {
  const { seller } = await getCurrentUserWithSeller();
  if (!seller) {
    throw new Error('Satıcı kaydı bulunamadı.');
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', seller.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Satıcı için yeni ürün oluştur
 */
export async function createProduct(payload) {
  const { seller } = await getCurrentUserWithSeller();
  if (!seller) {
    throw new Error('Satıcı kaydı bulunamadı.');
  }

  const { data, error } = await supabase
    .from('products')
    .insert({
      seller_id: seller.id,
      name: payload.name,
      description: payload.description || null,
      base_cost: payload.base_cost ?? null,
      sale_price: payload.sale_price ?? null,
      from_country: payload.from_country || null,
      weight_kg: payload.weight_kg ?? null,
      hs_code: payload.hs_code || null,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data;
}
