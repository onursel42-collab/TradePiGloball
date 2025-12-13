import { supabaseServer } from '../lib/supabaseServer.js';

export async function ownerOnly(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token' });

  const { data, error } = await supabaseServer.auth.getUser(token);
  const user = data?.user;
  if (error || !user) return res.status(401).json({ error: 'Invalid user' });

  if (!process.env.OWNER_UUID) return res.status(500).json({ error: 'OWNER_UUID missing' });
  if (user.id !== process.env.OWNER_UUID) return res.status(403).json({ error: 'Owner only' });

  req.owner = user;
  next();
}
