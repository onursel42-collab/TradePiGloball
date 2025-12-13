import express from 'express';
import { escrowWebhookRouter } from './escrow/webhook.js';

const app = express();
app.use(express.json());

// Escrow webhook
app.use('/webhooks/escrow', escrowWebhookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TradePiGloball backend running on port ${PORT}`);
});
