import { NextFunction, Request, Response } from "express";

import { HistoryService } from "../service/history.service";

const historyService = new HistoryService();

export const getAllHistory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { offset } = request.query;
    console.log(offset);
    const { rows, count } = await historyService.getAllHistory(Number(offset));
    response.send({
      data: {
        rows,
        total: count,
      },
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
    const { offset } = request.query;

    const { rows, count } = await historyService.getHistoryByPurchaseId(
      Number(id),
      Number(offset)
    );

    response.send({
      data: {
        rows,
        total: count,
      },
      timestamp: new Date(),
    });
  } catch (error) {
    next(error);
  }
};
