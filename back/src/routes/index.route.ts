import { type RequestHandler, Router } from "express";
import { purchaseRouter } from "./purchase.route";
import { historyRouter } from "./history.route";

export const routes = Router();

routes.use("/purchase", purchaseRouter);
routes.use("/history", historyRouter);
