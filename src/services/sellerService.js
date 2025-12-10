// src/services/sellerService.js
import { supabase } from '../lib/supabaseClient';

/**
 * Giriş yapmış kullanıcı + seller + plan bilgisi
 */
export async function getCurrentUserWithSeller() {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw userErr;

  const user = userData.user || null;
  if (!user) {
    return { user: null, seller: null, plan: null };
  }

  const { data: seller, error: sellerErr } = await supabase
    .from('sellers')
    .select('*, membership_plan_id')
    .eq('user_id', user.id)
    .single();

  if (sellerErr && sellerErr.code !== 'PGRST116') throw sellerErr;

  let plan = null;
  if (seller && seller.membership_plan_id) {
    const { data: planData, error: planErr } = await supabase
      .from('membership_plans')
      .select('*')
      .eq('id', seller.membership_plan_id)
      .single();
    if (planErr) throw planErr;
    plan = planData;
  }

  return { user, seller: seller || null, plan };
}

/**
 * Satıcı başvurusu (firma + seller kaydı)
 */
export async function createSellerApplication(payload) {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw userErr;
  const user = userData.user;
  if (!user) throw new Error('Önce giriş yapmalısın.');

  const { companyName, country, city, address, website, sector } = payload;

  const { data: company, error: cErr } = await supabase
    .from('companies')
    .insert({
      name: companyName,
      country,
      city,
      address,
      website: website || null,
      sector: sector || null,
    })
    .select('id')
    .single();

  if (cErr) throw cErr;

  const { error: sErr } = await supabase.from('sellers').insert({
    user_id: user.id,
    company_id: company.id,
    status: 'pending',
  });

  if (sErr) throw sErr;

  return { companyId: company.id };
}
