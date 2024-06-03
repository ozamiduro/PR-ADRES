import { HistoryModel } from "../config/db/Models/History.model";
import { PurchaseEntity } from "../entities/Purchase.entity";

export interface HistoryRepository {
  getAllHistory(): Promise<HistoryModel[]>;
  getHistoryByPurchaseId(id: number): Promise<HistoryModel[]>;
  savePurchaseInHistory(purchase: PurchaseEntity): Promise<string>;
}
