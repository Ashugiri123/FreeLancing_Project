import express from "express";
import {
  createProduct,
  listProducts,
  myProducts,
  productDetail
} from "../controllers/productController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

export const productRouter = express.Router();

productRouter.get("/", requireAuth, requireRole("customer", "student"), listProducts);
productRouter.get("/mine", requireAuth, requireRole("student"), myProducts);
productRouter.get("/:id", requireAuth, requireRole("customer", "student"), productDetail);
productRouter.post("/", requireAuth, requireRole("student"), upload.array("images", 5), createProduct);
