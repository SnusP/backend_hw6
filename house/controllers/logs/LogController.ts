import { Request, Response } from "express";
import LogService from "../../services/logs/LogService";
import { LogAttributes } from "../../models/logs/Log";

class LogController {
  private logService: LogService;

  constructor() {
    this.logService = new LogService();
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const log = await this.logService.getById(Number(req.params.id));
      return res.json(log);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const logs = await this.logService.getAll();
    return res.json(logs);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const log = await this.logService.create(
        req.body as Omit<LogAttributes, "id">
      );
      return res.status(201).json(log);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.logService.delete({
        id: Number(req.params.id),
      } as LogAttributes);
      return res.status(204).send("Log deleted successfully");
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default LogController;
