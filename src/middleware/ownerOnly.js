import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function ownerOnly(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid user' });
  }

  const { data, error: ownerError } = await supabase.rpc('is_owner');

  if (ownerError || !data) {
    return res.status(403).json({ error: 'Owner only' });
  }

  req.owner = user;
  next();
}
