import { Sequelize } from "sequelize";
import { initPurchaseModel } from "./Purchase.model";
import { initHistoryModel } from "./History.model";

export const initModels = (sequelize: Sequelize) => {
  initPurchaseModel(sequelize);
  initHistoryModel(sequelize);
};
