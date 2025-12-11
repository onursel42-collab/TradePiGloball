import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { supabase } from "./src/config/supabaseClient.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Sağlık kontrolü
app.get("/", (req, res) => {
  res.send("TradePiGloball Backend Çalışıyor ✔️");
});

// Üyelik paketleri endpoint'i
app.get("/plans", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("fair_plans")      // 👉 Eğer "plans" tablosu açtıysan burayı "plans" yap
      .select("*")
      .order("price", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res
        .status(500)
        .json({ error: "supabase error", details: error });
    }

    return res.json({ plans: data });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running at port:", port);
});
