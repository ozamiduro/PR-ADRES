import { RequestHandler, Router } from "express";
import {
  activateOrDeactivatePurchase,
  createPurchase,
  getAllPurchase,
  getPurchaseById,
  updatePurchase,
} from "../controllers/purchase.controller";

export const purchaseRouter = Router();

purchaseRouter.get("/", getAllPurchase as RequestHandler);
purchaseRouter.get("/:id", getPurchaseById as RequestHandler);
purchaseRouter.post("/", createPurchase as RequestHandler);
purchaseRouter.put("/:id", updatePurchase as RequestHandler);
purchaseRouter.delete("/:id", activateOrDeactivatePurchase as RequestHandler);
