import { HistoryModel } from "../config/db/Models/History.model";
import { PurchaseEntity } from "./Purchase.entity";

export class HistoryEntity extends HistoryModel {
  id: number | undefined;
  idPurchase: PurchaseEntity;
  budget: number;
  unity: string;
  typeGoodOrService: string;
  amount: number;
  unitValue: number;
  totalValue: number;
  supplier: string;
  purchaseDate: Date;
  documentation: string;
  isActive: boolean;

  constructor(
    idPurchase: PurchaseEntity,
    budget: number,
    unity: string,
    typeGoodOrService: string,
    amount: number,
    unitValue: number,
    totalValue: number,
    supplier: string,
    purchaseDate: Date,
    documentation: string,
    isActive: boolean
  ) {
    super();
    this.idPurchase = idPurchase;
    this.budget = budget;
    this.unity = unity;
    this.typeGoodOrService = typeGoodOrService;
    this.amount = amount;
    this.unitValue = unitValue;
    this.totalValue = totalValue;
    this.supplier = supplier;
    this.purchaseDate = purchaseDate;
    this.documentation = documentation;
    this.isActive = isActive;
  }
}
