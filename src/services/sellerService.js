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

  // PGRST116 = row not found
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
  if (!user) throw new Error('Önce giriş yapılısın.');

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

/**
 * Satıcıya üyelik paketi bağla
 */
export async function assignMembership(userId, planId) {
  const { error } = await supabase
    .from('seller_memberships')
    .insert([
      {
        user_id: userId,
        plan_id: planId,
        start_date: new Date().toISOString(),
        status: 'active',
      },
    ]);

  if (error) throw error;
  return true;
}

/**
 * Kullanıcının şu an aktif planı
 */
export async function getActiveMembership(userId) {
  const { data, error } = await supabase
    .from('seller_memberships')
    .select('*, membership_plans(*)')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  if (error) return null;
  return data;
}
export async function subscribePlan(planId) {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData?.user) throw new Error("Giriş yapmalısınız!");

  const userId = userData.user.id;

  const { error } = await supabase
    .from('seller_memberships')
    .insert([
      {
        seller_id: userId,
        plan_id: planId,
        status: 'active',
        start_date: new Date().toISOString()
      }
    ]);

  if (error) throw error;

  return true;
}
