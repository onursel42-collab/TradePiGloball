import express from 'express';
import { ownerOnly } from '../middleware/ownerOnly.js';

const router = express.Router();

router.get('/dashboard', ownerOnly, (req, res) => {
  res.json({
    ok: true,
    owner: req.owner.email,
  });
});

export default router;
