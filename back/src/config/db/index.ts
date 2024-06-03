import { Sequelize, Model, DataTypes } from "sequelize";
import { initModels } from "./Models";
import { PurchaseModel } from "./Models/Purchase.model";
import { HistoryModel } from "./Models/History.model";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
});

initModels(sequelize);

HistoryModel.belongsTo(PurchaseModel);

sequelize
  .sync()
  .then(() => {
    console.log("===================================");
    console.log("Database is ready");
    console.log("===================================");
  })
  .catch(() => {
    console.log("===================================");
    console.log("Database is not ready");
    console.log("===================================");
  });
