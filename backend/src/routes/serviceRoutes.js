import express from "express";
import {
  createService,
  listServices,
  myServices,
  serviceDetail
} from "../controllers/serviceController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

export const serviceRouter = express.Router();

serviceRouter.get("/", requireAuth, requireRole("customer", "student"), listServices);
serviceRouter.get("/mine", requireAuth, requireRole("student"), myServices);
serviceRouter.get("/:id", requireAuth, requireRole("customer", "student"), serviceDetail);
serviceRouter.post("/", requireAuth, requireRole("student"), createService);
