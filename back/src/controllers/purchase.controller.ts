import { NextFunction, Request, Response } from "express";
import { PurchaseService } from "../service/purchase.service";
import { PurchaseEntity } from "../entities/Purchase.entity";
import { HistoryService } from "../service/history.service";
import { PurchaseDTO, UpdatePurchaseDTO } from "../dto/Purchase.dto";
import { handleValidation } from "../utils/validation";

const purchaseService = new PurchaseService();
const historyService = new HistoryService();

export const getAllPurchase = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { active, offset, filter, start, end } = request.query;

    const query = isNaN(Number(filter)) ? filter : Number(filter);
    const startDate = start ? new Date(start as string) : undefined;
    const endDate = start ? new Date(end as string) : undefined;

    const { rows, count } = await purchaseService.getAllPurchase(
      active === "true",
      Number(offset),
      query as string | number | undefined,
      startDate as Date | undefined,
      endDate as Date | undefined
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

export const getPurchaseById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    const data = await purchaseService.getPurchaseById(Number(id));

    response.send({
      data,
      timestamp: new Date(),
    });
  } catch (error) {
    next(error);
  }
};

export const createPurchase = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      budget,
      unity,
      typeGoodOrService,
      amount,
      unitValue,
      supplier,
      purchaseDate,
      documentation,
    } = request.body;

    const purchaseDTO = new PurchaseDTO(
      Number(budget),
      unity,
      typeGoodOrService,
      Number(amount),
      Number(unitValue),
      supplier,
      purchaseDate,
      documentation
    );

    await handleValidation(purchaseDTO);

    const purchase = new PurchaseEntity(
      budget,
      unity,
      typeGoodOrService,
      amount,
      unitValue,
      amount * unitValue,
      supplier,
      purchaseDate,
      documentation,
      true
    );

    const data = await purchaseService.createPurchase(purchase);

    response.status(201).send({
      data,
      timestamp: new Date(),
    });
  } catch (error) {
    next(error);
  }
};

export const updatePurchase = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    const {
      budget,
      unity,
      typeGoodOrService,
      amount,
      unitValue,
      supplier,
      purchaseDate,
      documentation,
    } = request.body;

    const purchaseDTO = new UpdatePurchaseDTO(
      Number(budget),
      unity,
      typeGoodOrService,
      Number(amount),
      Number(unitValue),
      supplier,
      purchaseDate,
      documentation
    );

    await handleValidation(purchaseDTO);

    const purchase = await purchaseService.getPurchaseById(parseInt(id));

    if (purchase === null) {
      throw new Error(`Purchase with id ${id} doesn't exist`);
    }

    const purchaseUpdated = new PurchaseEntity(
      budget || purchase.getDataValue("budget"),
      unity || purchase.getDataValue("unity"),
      typeGoodOrService || purchase.getDataValue("typeGoodOrService"),
      amount || purchase.getDataValue("amount"),
      unitValue || purchase.getDataValue("unitValue"),
      amount * unitValue || purchase.getDataValue("totalValue"),
      supplier || purchase.getDataValue("typeGoodOrService"),
      purchaseDate || purchase.getDataValue("purchaseDate"),
      documentation || purchase.getDataValue("typeGoodOrService"),
      purchase.getDataValue("isActive")
    );

    purchaseUpdated.id = Number(id);
    const updatedDate = new Date(purchaseDate);
    updatedDate.setHours(updatedDate.getHours() + 5);

    purchaseUpdated.purchaseDate = updatedDate;

    const data = await purchaseService.updatePurchase(
      parseInt(id),
      purchaseUpdated
    );

    await historyService.savePurchaseInHistory(
      purchase.toJSON(),
      purchaseUpdated
    );

    response.send({
      data,
      timestamp: new Date(),
    });
  } catch (error) {
    next(error);
  }
};

export const activateOrDeactivatePurchase = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;

    const purchase = await purchaseService.getPurchaseById(parseInt(id));

    if (purchase === null) {
      throw new Error(`Purchase with id ${id} doesn't exist`);
    }

    const data = await purchaseService.activateOrdeactivatePurchase(
      parseInt(id),
      !(purchase.getDataValue("isActive") as boolean)
    );

    await historyService.saveActivateOrDeactivatePurchaseInHistory(
      purchase.toJSON()
    );

    response.send({
      data,
      timestamp: new Date(),
    });
  } catch (error) {
    next(error);
  }
};
