import express from 'express';
import { escrowWebhookRouter } from './escrow/webhook.js';

const app = express();
app.use(express.json());
app.get("/validation-key.txt", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.status(200).send(process.env.PI_VALIDATION_KEY);
});
// Escrow webhook
app.use('/webhooks/escrow', escrowWebhookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TradePiGloball backend running on port ${PORT}`);
});
