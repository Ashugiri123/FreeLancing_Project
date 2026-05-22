import express from "express";
import { login, me, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "approvalDocument", maxCount: 1 }
  ]),
  register
);
authRouter.post("/login", login);
authRouter.get("/me", requireAuth, me);
