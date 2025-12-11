import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./src/config/supabaseClient.js";

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("TradePiGloball Backend Çalışıyor ✔️");
});

// Üyelik Planları API
app.get("/plans", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .order("price");

    if (error) {
      console.error("Supabase Hatası:", error);
      return res.status(500).json({ error: "Supabase error", details: error });
    }

    return res.json(data);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Server error", details: err });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running at port:", port);
});
