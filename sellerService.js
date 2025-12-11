// sellerService.js
import { supabaseAdmin } from './supabaseClient.js'
import { randomUUID } from 'crypto'

/**
 * Aktif SELLER membership planlarını getirir.
 * membership_plans:
 *  - plan_group = 'seller'
 *  - is_active = true
 */
export async function getActiveSellerPlans() {
  const { data, error } = await supabaseAdmin
    .from('membership_plans')
    .select('*')
    .eq('plan_group', 'seller')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getActiveSellerPlans] error:', error)
    throw new Error('Paketler yüklenirken bir hata oluştu.')
  }

  return data || []
}

/**
 * Seller başvurusu oluşturur (public endpoint).
 * seller_applications tablosuna insert atar.
 */
export async function createSellerApplication(input) {
  const {
    company_name,
    contact_name,
    email,
    phone,
    country,
    city,
    main_products
  } = input

  const payload = {
    id: randomUUID(),
    company_name,
    contact_name,
    email,
    phone: phone || null,
    country: country || null,
    city: city || null,
    main_products,
    status: 'pending'
  }

  const { data, error } = await supabaseAdmin
    .from('seller_applications')
    .insert(payload)
    .select()
    .single()

  if (error) {
    console.error('[createSellerApplication] error:', error)
    throw new Error('Satıcı başvurusu kaydedilemedi.')
  }

  return data
}

/**
 * Admin için: pending başvuruları listeler.
 */
export async function listPendingApplications() {
  const { data, error } = await supabaseAdmin
    .from('seller_applications')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[listPendingApplications] error:', error)
    throw new Error('Başvuru listesi alınamadı.')
  }

  return data || []
}

/**
 * Admin için: başvuruyu APPROVE eder.
 *
 * 1) companies tablosuna kayıt
 * 2) sellers tablosuna kayıt
 * 3) seller_applications.status = 'approved'
 *
 * Not: user_id şu an parametre ile geliyor (auth sistemine göre bağlarsın).
 */
export async function approveSellerApplication({ applicationId, userId }) {
  // 1) Başvuruyu çek
  const { data: application, error: appError } = await supabaseAdmin
    .from('seller_applications')
    .select('*')
    .eq('id', applicationId)
    .single()

  if (appError || !application) {
    console.error('[approveSellerApplication] appError:', appError)
    throw new Error('Başvuru bulunamadı.')
  }

  // 2) Şirket oluştur
  const companyPayload = {
    id: randomUUID(),
    name: application.company_name,
    legal_name: application.company_name,
    country: application.country,
    city: application.city,
    sector: null
  }

  const { data: company, error: companyError } = await supabaseAdmin
    .from('companies')
    .insert(companyPayload)
    .select()
    .single()

  if (companyError) {
    console.error('[approveSellerApplication] companyError:', companyError)
    throw new Error('Şirket kaydı oluşturulamadı.')
  }

  // 3) Seller kaydı oluştur
  const sellerPayload = {
    id: randomUUID(),
    user_id: userId,
    company_id: company.id,
    status: 'approved',
    membership_plan_id: null
  }

  const { data: seller, error: sellerError } = await supabaseAdmin
    .from('sellers')
    .insert(sellerPayload)
    .select()
    .single()

  if (sellerError) {
    console.error('[approveSellerApplication] sellerError:', sellerError)
    throw new Error('Seller kaydı oluşturulamadı.')
  }

  // 4) Başvuru status = approved
  const { error: updateError } = await supabaseAdmin
    .from('seller_applications')
    .update({ status: 'approved' })
    .eq('id', applicationId)

  if (updateError) {
    console.error('[approveSellerApplication] updateError:', updateError)
    // kritik değil ama loglayalım
  }

  return { company, seller }
}

/**
 * Verilen user_id için seller kaydını getirir.
 */
export async function getSellerByUserId(userId) {
  const { data, error } = await supabaseAdmin
    .from('sellers')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    console.error('[getSellerByUserId] error:', error)
    throw new Error('Seller bilgisi alınamadı.')
  }

  return data // null olabilir
}

/**
 * Verilen seller_id için aktif membership kaydını getirir.
 */
export async function getActiveSellerMembership(sellerId) {
  const { data, error } = await supabaseAdmin
    .from('seller_memberships')
    .select('*')
    .eq('seller_id', sellerId)
    .eq('status', 'active')
    .maybeSingle()

  if (error) {
    console.error('[getActiveSellerMembership] error:', error)
    throw new Error('Üyelik bilgisi alınamadı.')
  }

  return data
}

/**
 * Seller için yeni membership oluşturur.
 * - Eski active membership varsa status = 'expired'
 * - Yeni membership active olarak eklenir.
 * - membership_plans.code ile planId bulunur.
 */
export async function createOrChangeSellerMembership({ sellerId, planCode }) {
  // Plan'ı bul
  const { data: plan, error: planError } = await supabaseAdmin
    .from('membership_plans')
    .select('*')
    .eq('code', planCode)
    .eq('plan_group', 'seller')
    .eq('is_active', true)
    .single()

  if (planError || !plan) {
    console.error('[createOrChangeSellerMembership] planError:', planError)
    throw new Error('Seçilen paket bulunamadı.')
  }

  // Eski active membership'ı expire et
  const { error: expireError } = await supabaseAdmin
    .from('seller_memberships')
    .update({ status: 'expired', end_date: new Date().toISOString() })
    .eq('seller_id', sellerId)
    .eq('status', 'active')

  if (expireError) {
    console.error('[createOrChangeSellerMembership] expireError:', expireError)
    // kritik değil, devam edelim ama loglayalım
  }

  // Yeni membership oluştur
  const membershipPayload = {
    id: randomUUID(),
    seller_id: sellerId,
    plan_id: plan.id,
    status: 'active',
    start_date: new Date().toISOString(),
    end_date: null
  } 

  const { data: membership, error: membershipError } = await supabaseAdmin
    .from('seller_memberships')
    .insert(membershipPayload)
    .select()
    .single()

  if (membershipError) {
    console.error(
      '[createOrChangeSellerMembership] membershipError:',
      membershipError
    )
    throw new Error('Yeni üyelik kaydı oluşturulamadı.')
  }

  // sellers tablosundaki membership_plan_id alanını da güncelle (cache)
  const { error: sellerUpdateError } = await supabaseAdmin
    .from('sellers')
    .update({ membership_plan_id: plan.id })
    .eq('id', sellerId)

  if (sellerUpdateError) {
    console.error(
      '[createOrChangeSellerMembership] sellerUpdateError:',
      sellerUpdateError
    )
    // yine kritik değil ama loglayalım
  }

  return { plan, membership }
}
