import { PurchaseModel } from "../config/db/Models/Purchase.model";

export class PurchaseEntity extends PurchaseModel {
  id: number | undefined;
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
