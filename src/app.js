import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import membershipRoutes from "./routes/membership.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/auth", authRoutes);
app.use("/company", companyRoutes);
app.use("/membership", membershipRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "TradePiGlobal Backend" });
});

export default app;
