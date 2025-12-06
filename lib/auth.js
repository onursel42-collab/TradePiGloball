// lib/auth.js
import { supabase } from './supabaseClient';

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('getCurrentUser error:', error.message);
    return null;
  }
  return user;
}

export async function getProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('getProfile error:', error.message);
    return null;
  }

  return data;
}
