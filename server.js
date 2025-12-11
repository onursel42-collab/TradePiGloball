import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./src/config/supabaseClient.js";

const app = express();
app.use(cors());
app.use(express.json());

// Sağlık kontrolü
app.get("/", (req, res) => {
  res.send("TradePiGloball Backend Çalışıyor ✔️");
});

// Üyelik paketleri
app.get("/plans", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("fair_plans")
      .select("*");

    if (error) {
      return res.status(500).json({
        error: "supabase error",
        details: error
      });
    }

    return res.json({ plans: data });
  } catch (err) {
    return res.status(500).json({
      error: "server error",
      details: err.message
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running at port:", port);
});
