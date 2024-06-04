import { IsDateString, IsNumber, IsString, ValidateIf } from "class-validator";

export class PurchaseDTO {
  @IsNumber(undefined, {
    message: "El presupuesto debe ser un número",
  })
  budget: number;

  @IsString()
  unity: string;

  @IsString()
  typeGoodOrService: string;

  @IsNumber(undefined, {
    message: "La cantidad debe ser un número",
  })
  amount: number;

  @IsNumber(undefined, {
    message: "El valor por unidad debe ser un número",
  })
  unitValue: number;

  @IsString()
  supplier: string;

  @IsDateString()
  purchaseDate: Date;

  @IsString()
  documentation: string;

  constructor(
    budget: number,
    unity: string,
    typeGoodOrService: string,
    amount: number,
    unitValue: number,
    supplier: string,
    purchaseDate: Date,
    documentation: string
  ) {
    this.budget = budget;
    this.unity = unity;
    this.typeGoodOrService = typeGoodOrService;
    this.amount = amount;
    this.unitValue = unitValue;
    this.supplier = supplier;
    this.purchaseDate = purchaseDate;
    this.documentation = documentation;
  }
}

export class UpdatePurchaseDTO {
  @ValidateIf((o) => o.budget !== undefined)
  @IsNumber(undefined, {
    message: "El presupuesto debe ser un número",
  })
  budget: number;

  @ValidateIf((o) => o.unity !== undefined)
  @IsString()
  unity: string;

  @ValidateIf((o) => o.typeGoodOrService !== undefined)
  @IsString()
  typeGoodOrService: string;

  @ValidateIf((o) => o.amount !== undefined)
  @IsNumber(undefined, {
    message: "La cantidad debe ser un número",
  })
  amount: number;

  @ValidateIf((o) => o.amount !== undefined)
  @IsNumber(undefined, {
    message: "El valor por unidad debe ser un número",
  })
  unitValue: number;

  @ValidateIf((o) => o.supplier !== undefined)
  @IsString()
  supplier: string;

  @ValidateIf((o) => o.purchaseDate !== undefined)
  @IsDateString()
  purchaseDate: Date;

  @ValidateIf((o) => o.documentation !== undefined)
  @IsString()
  documentation: string;

  constructor(
    budget: number,
    unity: string,
    typeGoodOrService: string,
    amount: number,
    unitValue: number,
    supplier: string,
    purchaseDate: Date,
    documentation: string
  ) {
    this.budget = budget;
    this.unity = unity;
    this.typeGoodOrService = typeGoodOrService;
    this.amount = amount;
    this.unitValue = unitValue;
    this.supplier = supplier;
    this.purchaseDate = purchaseDate;
    this.documentation = documentation;
  }
}
