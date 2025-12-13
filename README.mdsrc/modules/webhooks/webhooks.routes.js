import { Router } from "express";
import { escrowComWebhookHandler } from "./escrowcom.webhook.js";

export const webhooksRouter = Router();

webhooksRouter.post("/escrowcom", escrowComWebhookHandler);
