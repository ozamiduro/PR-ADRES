import { NextFunction, Request, Response } from "express";
import { PurchaseService } from "../service/purchase.service";
import { PurchaseEntity } from "../entities/Purchase.entity";

const purchaseService = new PurchaseService();

export const getAllPurchase = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const data = await purchaseService.getAllPurchase();

    response.send({
      data,
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
      documentation,
    } = request.body;

    const purchase = new PurchaseEntity(
      budget,
      unity,
      typeGoodOrService,
      amount,
      unitValue,
      amount * unitValue,
      supplier,
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
      documentation,
    } = request.body;

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
      documentation || purchase.getDataValue("typeGoodOrService"),
      purchase.getDataValue("isActive")
    );

    const data = await purchaseService.updatePurchase(
      parseInt(id),
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

    response.send({
      data,
      timestamp: new Date(),
    });
  } catch (error) {
    next(error);
  }
};
