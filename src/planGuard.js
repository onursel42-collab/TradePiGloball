import { supabase } from "./supabaseClient.js";

export async function getCompanyPlan(company_id) {
  const { data: membership, error: mErr } = await supabase
    .from("company_memberships")
    .select("plan_id, status")
    .eq("company_id", company_id)
    .eq("status", "active")
    .maybeSingle();

  if (mErr) throw new Error(mErr.message);

  // plan yoksa basic planı bul
  const planId = membership?.plan_id;
  let planQuery = supabase.from("membership_plans").select("*");
  planQuery = planId ? planQuery.eq("id", planId) : planQuery.eq("code", "basic");

  const { data: plan, error: pErr } = await planQuery.single();
  if (pErr) throw new Error(pErr.message);
  return plan;
}

export async function assertLimit({ company_id, kind }) {
  const plan = await getCompanyPlan(company_id);

  if (kind === "product") {
    const { count } = await supabase.from("products").select("*", { count: "exact", head: true }).eq("company_id", company_id);
    if (count >= plan.product_limit) throw new Error(`Plan limit: products (${plan.product_limit})`);
  }

  if (kind === "showroom") {
    const { count } = await supabase.from("showrooms").select("*", { count: "exact", head: true }).eq("company_id", company_id);
    if (count >= plan.showroom_limit) throw new Error(`Plan limit: showrooms (${plan.showroom_limit})`);
  }

  return plan;
}
