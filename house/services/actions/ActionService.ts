import { Action, ActionAttributes } from "../../models/actions/Action";
import ActionRepository from "../../repositories/actions/ActionRepository";

class ActionService {
  private actionRepository: ActionRepository;

  constructor() {
    this.actionRepository = new ActionRepository();
  }

  async getById(id: number): Promise<Action> {
    const action = await this.actionRepository.findById(id);
    if (!action) {
      throw new Error("Action not found");
    }
    return action;
  }

  async getAll(): Promise<Action[]> {
    return await this.actionRepository.findAll();
  }

  async create(actionData: Omit<ActionAttributes, "id">): Promise<Action> {
    return await this.actionRepository.create(actionData);
  }

  async update(
    action: ActionAttributes,
    actionData: Partial<ActionAttributes>
  ): Promise<Action> {
    const [updatedRowsCount, updatedAction] =
      await this.actionRepository.update(action, actionData);
    if (updatedRowsCount === 0) {
      throw new Error("Action not found");
    }
    return updatedAction[0];
  }

  async delete(action: ActionAttributes): Promise<number> {
    const deletedRowsCount = await this.actionRepository.delete(action);
    if (deletedRowsCount === 0) {
      throw new Error("Action not found");
    }
    return deletedRowsCount;
  }
}

export default ActionService;
