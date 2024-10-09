import { Request, Response } from "express";
import ScenarioDeviceService from "../../services/scenarioDevices/ScenarioDeviceService";
import { ScenarioDeviceAttributes } from "../../models/scenarioDevices/ScenarioDevice";

class ScenarioDeviceController {
  private scenarioDeviceService: ScenarioDeviceService;

  constructor() {
    this.scenarioDeviceService = new ScenarioDeviceService();
  }
  async getById(req: Request, res: Response) {
    try {
      const scenarioDevice = await this.scenarioDeviceService.getById(
        Number(req.params.id)
      );
      res.status(200).json(scenarioDevice);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const scenarioDevices = await this.scenarioDeviceService.getAll();
    res.status(200).json(scenarioDevices);
  }

  async create(req: Request, res: Response) {
    try {
      const scenarioDeviceData: ScenarioDeviceAttributes = req.body;
      const scenarioDevice = await this.scenarioDeviceService.create(
        scenarioDeviceData
      );
      res.status(201).json(scenarioDevice);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const scenarioDeviceData: ScenarioDeviceAttributes = req.body;
      const updatedScenarioDevice = await this.scenarioDeviceService.update(
        scenarioDeviceData,
        req.body
      );
      res.status(200).json(updatedScenarioDevice);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.scenarioDeviceService.delete(Number(req.params.id));
      res.status(204).send("Scenario deleted from your device");
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default ScenarioDeviceController;
