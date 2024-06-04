import { HistoryModel } from "../config/db/Models/History.model";
import { PurchaseModel } from "../config/db/Models/Purchase.model";
import { PurchaseEntity } from "../entities/Purchase.entity";
import { HistoryRepository } from "../repositories/historial.entity";

export class HistoryService implements HistoryRepository {
  async getAllHistory(
    offset: number
  ): Promise<{ rows: HistoryModel[]; count: number }> {
    return await HistoryModel.findAndCountAll({
      include: { model: PurchaseModel, as: "Purchase" },
      order: [["createdAt", "DESC"]],
      offset: offset * 10,
      limit: 10,
    });
  }
  async getHistoryByPurchaseId(
    id: number,
    offset: number
  ): Promise<{ rows: HistoryModel[]; count: number }> {
    return await HistoryModel.findAndCountAll({
      include: { model: PurchaseModel, where: { id } },
      order: [["createdAt", "DESC"]],
      offset: offset * 10,
      limit: 10,
    });
  }
  async savePurchaseInHistory(
    purchase: PurchaseEntity,
    purchaseUpdate: PurchaseEntity
  ): Promise<string> {
    const obj = {
      budget:
        Number(purchase.budget) !== Number(purchaseUpdate.budget)
          ? purchaseUpdate.budget
          : null,
      unity:
        purchase.unity !== purchaseUpdate.unity ? purchaseUpdate.unity : null,
      typeGoodOrService:
        purchase.typeGoodOrService !== purchaseUpdate.typeGoodOrService
          ? purchaseUpdate.typeGoodOrService
          : null,
      amount:
        Number(purchase.amount) !== Number(purchaseUpdate.amount)
          ? purchaseUpdate.amount
          : null,
      unitValue:
        Number(purchase.unitValue) !== Number(purchaseUpdate.unitValue)
          ? purchaseUpdate.unitValue
          : null,
      totalValue:
        Number(purchaseUpdate.totalValue) !== Number(purchaseUpdate.totalValue)
          ? purchaseUpdate.totalValue
          : null,
      supplier:
        purchase.supplier !== purchaseUpdate.supplier
          ? purchaseUpdate.supplier
          : null,
      purchaseDate: new Date(),
      documentation:
        purchase.documentation !== purchaseUpdate.documentation
          ? purchaseUpdate.documentation
          : null,
      isActive:
        purchase.isActive !== purchase.isActive
          ? purchaseUpdate.isActive
          : purchase.isActive,
      purchaseId: purchase.id,
    };

    await HistoryModel.create(obj);
    return "OK";
  }
  async saveActivateOrDeactivatePurchaseInHistory(
    purchase: PurchaseEntity
  ): Promise<string> {
    await HistoryModel.create({
      isActive: !purchase.isActive,
      purchaseId: purchase.id,
    });
    return "OK";
  }
}
