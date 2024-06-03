import { PurchaseModel } from "../config/db/Models/Purchase.model";
import { PurchaseEntity } from "../entities/Purchase.entity";

export interface PurchaseRepository {
  getAllPurchase(): Promise<PurchaseModel[]>;
  getPurchaseById(id: number): Promise<PurchaseModel | null>;
  createPurchase(entity: PurchaseEntity): Promise<string>;
  updatePurchase(id: number, entity: PurchaseEntity): Promise<string>;
  activateOrdeactivatePurchase(id: number, isActive: boolean): Promise<string>;
}
