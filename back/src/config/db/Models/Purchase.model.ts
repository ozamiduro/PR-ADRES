import { Sequelize, Model, DataTypes } from "sequelize";

export class PurchaseModel extends Model {}

export const initPurchaseModel = (sequelize: Sequelize) => {
  PurchaseModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      budget: DataTypes.NUMBER,
      unity: DataTypes.STRING,
      typeGoodOrService: DataTypes.STRING,
      amount: DataTypes.NUMBER,
      unitValue: DataTypes.NUMBER,
      totalValue: DataTypes.NUMBER,
      supplier: DataTypes.STRING,
      documentation: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    { sequelize, modelName: "purchase" }
  );
};
