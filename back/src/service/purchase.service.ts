import { PurchaseModel } from "../config/db/Models/Purchase.model";
import { HistoryEntity } from "../entities/History.entity";
import { PurchaseEntity } from "../entities/Purchase.entity";
import { PurchaseRepository } from "../repositories/purchase.repository";
import { HistoryService } from "./history.service";

export class PurchaseService implements PurchaseRepository {
  private historyService = new HistoryService();

  async getAllPurchase(): Promise<PurchaseModel[]> {
    return await PurchaseModel.findAll();
  }
  async getPurchaseById(id: number): Promise<PurchaseModel | null> {
    return await PurchaseModel.findOne({ where: { id } });
  }
  async createPurchase(entity: PurchaseEntity): Promise<string> {
    const purchase = await PurchaseModel.create(entity.toJSON());

    this.historyService.savePurchaseInHistory(purchase.getDataValue("id"));
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
