import { RequestHandler, Router } from "express";
import {
  getAllHistory,
  getHistoryByPurchaseId,
} from "../controllers/history.controller";

export const historyRouter = Router();

historyRouter.get("/", getAllHistory as RequestHandler);
historyRouter.get("/:id", getHistoryByPurchaseId as RequestHandler);
