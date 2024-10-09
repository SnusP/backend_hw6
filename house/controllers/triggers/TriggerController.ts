import { Request, Response } from "express";
import TriggerService from "../../services/triggers/TriggerService";
import { TriggerAttributes } from "../../models/triggers/Trigger";

class TriggerController {
  private triggerService: TriggerService;

  constructor() {
    this.triggerService = new TriggerService();
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const trigger = await this.triggerService.getById(Number(req.params.id));
      return res.json(trigger);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const triggers = await this.triggerService.getAll();
    return res.json(triggers);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const trigger = await this.triggerService.create(
        req.body as Omit<TriggerAttributes, "id">
      );
      return res.status(201).json(trigger);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedTrigger = await this.triggerService.update(
        { id: Number(req.params.id) } as TriggerAttributes,
        req.body
      );
      return res.json(updatedTrigger);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.triggerService.delete({
        id: Number(req.params.id),
      } as TriggerAttributes);
      return res.status(204).send("Trigger deleted successfully");
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default TriggerController;
