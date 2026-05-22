import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { authRouter } from "./routes/authRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
import { serviceRouter } from "./routes/serviceRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const allowedOrigins = new Set([
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      console.error(`[cors] Blocked request from ${origin}`);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "UNIVENDA" });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/services", serviceRouter);

app.listen(port, () => {
  console.log(`UNIVENDA API running on port ${port}`);
});
