import {
  Trigger,
  TriggerAttributes,
  TriggerCreationAttributes,
} from "../../models/triggers/Trigger";

class TriggerRepository {
  async findById(id: number): Promise<Trigger | null> {
    return await Trigger.findByPk(id);
  }

  async findAll(): Promise<Trigger[]> {
    return await Trigger.findAll();
  }

  async create(
    triggerData: Omit<TriggerCreationAttributes, "id">
  ): Promise<Trigger> {
    return await Trigger.create(triggerData);
  }

  async update(
    trigger: TriggerAttributes,
    data: Partial<TriggerAttributes>
  ): Promise<[number, Trigger[]]> {
    return await Trigger.update(data, {
      where: { id: trigger.id },
      returning: true,
    });
  }

  async delete(trigger: TriggerAttributes): Promise<number> {
    return await Trigger.destroy({
      where: { id: trigger.id },
    });
  }
}

export default TriggerRepository;
