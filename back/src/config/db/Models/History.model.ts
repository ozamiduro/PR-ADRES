import { Sequelize, Model, DataTypes } from "sequelize";

export class HistoryModel extends Model {}

export const initHistoryModel = (sequelize: Sequelize) => {
  HistoryModel.init(
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
      purchaseDate: DataTypes.DATE,
      documentation: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    { sequelize, modelName: "history" }
  );
};
