import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// src klasöründeki supabaseClient
import { supabase } from "./src/supabaseClient.js";

const app = express();
app.use(cors());
app.use(express.json());

// Sağlık kontrolü (test)
app.get("/", (req, res) => {
  res.send("TradePiGlobal Backend Çalışıyor ✔️");
});

// İleride buraya /api/... endpointlerini ekleyeceğiz

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running at port:", port);
});
