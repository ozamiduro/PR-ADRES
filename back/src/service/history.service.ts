import { HistoryModel } from "../config/db/Models/History.model";
import { PurchaseModel } from "../config/db/Models/Purchase.model";
import { PurchaseEntity } from "../entities/Purchase.entity";
import { HistoryRepository } from "../repositories/historial.entity";

export class HistoryService implements HistoryRepository {
  async getAllHistory(): Promise<HistoryModel[]> {
    return await HistoryModel.findAll({
      include: { model: PurchaseModel, as: "Purchase" },
    });
  }
  async getHistoryByPurchaseId(id: number): Promise<HistoryModel[]> {
    return await HistoryModel.findAll({
      include: { model: PurchaseModel, where: { id } },
    });
  }
  async savePurchaseInHistory(purchase: PurchaseEntity): Promise<string> {
    await HistoryModel.create({ purchaseId: purchase });
    return "OK";
  }
}
