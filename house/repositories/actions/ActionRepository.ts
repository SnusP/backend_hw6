import { Action, ActionAttributes } from "../../models/actions/Action";

class ActionRepository {
  async findById(id: number): Promise<Action | null> {
    return await Action.findByPk(id);
  }

  async findAll(): Promise<Action[]> {
    return await Action.findAll();
  }

  async create(actionData: Omit<ActionAttributes, "id">): Promise<Action> {
    return await Action.create(actionData);
  }

  async update(
    action: ActionAttributes,
    data: Partial<ActionAttributes>
  ): Promise<[number, Action[]]> {
    return await Action.update(data, {
      where: { id: action.id },
      returning: true,
    });
  }

  async delete(action: ActionAttributes): Promise<number> {
    return await Action.destroy({
      where: { id: action.id },
    });
  }
}

export default ActionRepository;
