import { HistoryModel } from "../config/db/Models/History.model";
import { PurchaseEntity } from "../entities/Purchase.entity";

export interface HistoryRepository {
  getAllHistory(
    offset: number
  ): Promise<{ rows: HistoryModel[]; count: number }>;
  getHistoryByPurchaseId(
    id: number,
    offset: number
  ): Promise<{ rows: HistoryModel[]; count: number }>;
  savePurchaseInHistory(
    purchase: PurchaseEntity,
    purchaseUpdate: PurchaseEntity
  ): Promise<string>;
  saveActivateOrDeactivatePurchaseInHistory(
    purchase: PurchaseEntity
  ): Promise<string>;
}
