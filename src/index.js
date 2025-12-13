import express from 'express';
import { escrowWebhookRouter } from './escrow/webhook.js';

const app = express();
app.get("/", (req, res) => {
  res.status(200).send(`
    <html>
      <head><title>TradePiGloball</title></head>
      <body style="font-family:Arial;padding:24px">
        <h1>TradePiGloball ✅</h1>
        <p>Site canlı. Frontend yakında.</p>
        <p><a href="/health">Health Check</a></p>
      </body>
    </html>
  `);
});

app.get("/health", (req, res) => res.status(200).json({ ok: true }));

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
