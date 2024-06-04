import { Op, WhereOptions } from "sequelize";
import { PurchaseModel } from "../config/db/Models/Purchase.model";
import { PurchaseEntity } from "../entities/Purchase.entity";
import { PurchaseRepository } from "../repositories/purchase.repository";

export class PurchaseService implements PurchaseRepository {
  async getAllPurchase(
    active: boolean,
    offset: number,
    value?: string | number,
    start?: Date,
    end?: Date
  ): Promise<{ rows: PurchaseModel[]; count: number }> {
    let filterElement: WhereOptions<any> = {};

    if (value === undefined && start === undefined && end === undefined) {
      return await PurchaseModel.findAndCountAll({
        order: [["purchaseDate", "DESC"]],
        where: {
          isActive: active,
        },
        offset: offset * 10,
        limit: 10,
      });
    }

    if (typeof value === "string" || (start && end)) {
      const filterQuery = {
        [Op.or]: [
          { unity: { [Op.like]: `%${value}%` } },
          { typeGoodOrService: { [Op.like]: `%${value}%` } },
        ],
      };

      const filterDate = {
        purchaseDate: { [Op.between]: [start, end] },
      };

      if (typeof value === "string" && start && end) {
        filterElement = {
          [Op.and]: [filterQuery, filterDate],
        };
      } else if (typeof value === "string" && !start && !end) {
        filterElement = filterQuery;
      } else {
        filterElement = filterDate;
      }
    } else if (typeof value === "string" && !start && !end) {
      filterElement = {
        [Op.and]: [
          {
            [Op.or]: [
              { unity: { [Op.like]: `%${value}%` } },
              { typeGoodOrService: { [Op.like]: `%${value}%` } },
            ],
          },
          {
            purchaseDate: { [Op.between]: [start, end] },
          },
          {
            isActive: active,
          },
        ],
      };
    } else {
      filterElement = {
        id: value,
      };
    }

    return await PurchaseModel.findAndCountAll({
      order: [["purchaseDate", "ASC"]],
      where: {
        ...filterElement,
        isActive: active,
      },
      offset: offset * 10,
      limit: 10,
    });
  }
  async getPurchaseById(id: number): Promise<PurchaseModel | null> {
    return await PurchaseModel.findOne({ where: { id } });
  }
  async createPurchase(entity: PurchaseEntity): Promise<string> {
    await PurchaseModel.create(entity.toJSON());
    return "Create purchase successfully!";
  }
  async updatePurchase(id: number, entity: PurchaseEntity): Promise<string> {
    await PurchaseModel.update(entity.toJSON(), { where: { id } });
    return "Update purchase successfully!";
  }
  async activateOrdeactivatePurchase(
    id: number,
    isActive: boolean
  ): Promise<string> {
    await PurchaseModel.update({ isActive }, { where: { id } });
    return "Deactivate purchase successfully!";
  }
}
