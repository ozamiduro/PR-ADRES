import { PurchaseModel } from "../config/db/Models/Purchase.model";
import { PurchaseEntity } from "../entities/Purchase.entity";

export interface PurchaseRepository {
  getAllPurchase(
    active: boolean,
    offset: number,
    value?: string | number,
    start?: Date,
    end?: Date
  ): Promise<{ rows: PurchaseModel[]; count: number }>;
  getPurchaseById(id: number): Promise<PurchaseModel | null>;
  createPurchase(entity: PurchaseEntity): Promise<string>;
  updatePurchase(id: number, entity: PurchaseEntity): Promise<string>;
  activateOrdeactivatePurchase(id: number, isActive: boolean): Promise<string>;
}
