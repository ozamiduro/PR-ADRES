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
    },
    { sequelize, modelName: "history" }
  );
};
