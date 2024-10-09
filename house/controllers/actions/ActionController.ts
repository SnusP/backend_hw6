import { Request, Response } from "express";
import ActionService from "../../services/actions/ActionService";
import { ActionAttributes } from "../../models/actions/Action";

class ActionController {
  private actionService: ActionService;

  constructor() {
    this.actionService = new ActionService();
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const action = await this.actionService.getById(Number(req.params.id));
      return res.json(action);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const actions = await this.actionService.getAll();
    return res.json(actions);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const action = await this.actionService.create(
        req.body as Omit<ActionAttributes, "id">
      );
      return res.status(201).json(action);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedAction = await this.actionService.update(
        { id: Number(req.params.id) } as ActionAttributes,
        req.body
      );
      return res.json(updatedAction);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.actionService.delete({
        id: Number(req.params.id),
      } as ActionAttributes);
      return res.status(204).send("Action deleted successfully");
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default ActionController;
