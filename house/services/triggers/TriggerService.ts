import { Trigger, TriggerAttributes } from "../../models/triggers/Trigger";
import TriggerRepository from "../../repositories/triggers/TriggerRepository";

class TriggerService {
  private triggerRepository: TriggerRepository;

  constructor() {
    this.triggerRepository = new TriggerRepository();
  }

  async getById(id: number): Promise<Trigger> {
    const trigger = await this.triggerRepository.findById(id);
    if (!trigger) {
      throw new Error("Trigger not found");
    }
    return trigger;
  }

  async getAll(): Promise<Trigger[]> {
    return await this.triggerRepository.findAll();
  }

  async create(triggerData: Omit<TriggerAttributes, "id">): Promise<Trigger> {
    return await this.triggerRepository.create(triggerData);
  }

  async update(
    trigger: TriggerAttributes,
    triggerData: Partial<TriggerAttributes>
  ): Promise<Trigger> {
    const [updatedRowsCount, updatedTrigger] =
      await this.triggerRepository.update(trigger, triggerData);
    if (updatedRowsCount === 0) {
      throw new Error("Trigger not found");
    }
    return updatedTrigger[0];
  }

  async delete(trigger: TriggerAttributes): Promise<number> {
    const deletedRowsCount = await this.triggerRepository.delete(trigger);
    if (deletedRowsCount === 0) {
      throw new Error("Trigger not found");
    }
    return deletedRowsCount;
  }
}

export default TriggerService;
