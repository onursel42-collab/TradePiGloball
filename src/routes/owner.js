import { Router } from 'express';
import { ownerOnly } from '../middleware/ownerOnly.js';

const r = Router();

r.get('/ping', ownerOnly, (req, res) => {
  res.json({ ok: true, owner: req.owner.id });
});

export default r;
