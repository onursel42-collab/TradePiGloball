import express from 'express';
import { supabase } from '../supabaseclient.js';

export const escrowWebhookRouter = express.Router();

escrowWebhookRouter.post('/', async (req, res) => {
  const event = req.body;

  // Şimdilik sadece log
  console.log('ESCROW WEBHOOK:', event);

  res.sendStatus(200);
});
