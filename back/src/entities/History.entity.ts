import { HistoryModel } from "../config/db/Models/History.model";
import { PurchaseEntity } from "./Purchase.entity";

export class HistoryEntity extends HistoryModel {
  id: number | undefined;
  idPurchase: PurchaseEntity;

  constructor(idPurchase: PurchaseEntity) {
    super();
    this.idPurchase = idPurchase;
  }
}
