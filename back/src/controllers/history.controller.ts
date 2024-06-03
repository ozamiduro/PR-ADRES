import { NextFunction, Request, Response } from "express";

import { HistoryService } from "../service/history.service";

const historyService = new HistoryService();

export const getAllHistory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const history = await historyService.getAllHistory();
    response.send({
      data: history,
      timestamp: new Date(),
    });
  } catch (error) {
    next(error);
  }
};

export const getHistoryByPurchaseId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;

    const history = await historyService.getHistoryByPurchaseId(Number(id));

    response.send({
      data: history,
      timestamp: new Date(),
    });
  } catch (error) {
    next(error);
  }
};
