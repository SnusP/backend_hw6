import { Request, Response } from "express";
import ScenarioService from "../../services/scenarios/ScenarioService";
import ScenarioDeviceService from "../../services/scenarioDevices/ScenarioDeviceService";
import { ScenarioAttributes } from "../../models/scenarios/Scenario";
import LogService from "../../services/logs/LogService";
import { ScenarioDevice } from "../../models/scenarioDevices/ScenarioDevice";

class ScenarioController {
  private scenarioService: ScenarioService;
  private scenarioDeviceService: ScenarioDeviceService;
  private logService: LogService;

  constructor() {
    this.scenarioService = new ScenarioService();
    this.scenarioDeviceService = new ScenarioDeviceService();
    this.logService = new LogService();
  }

  async getById(req: any, res: Response): Promise<Response> {
    try {
      const scenarioId = Number(req.params.id);
      const scenario = await this.scenarioService.getById(scenarioId);
      await this.checkUserScenarioOwnership(
        Number(req.headers["user"]),
        scenarioId
      );
      return res.json(scenario);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async getAll(req: any, res: Response): Promise<Response> {
    const scenarios = await this.scenarioService.getAll();
    return res.json(scenarios);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const scenario = await this.scenarioService.create(
        req.body as Omit<ScenarioAttributes, "id">
      );
      return res.status(201).json(scenario);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: any, res: Response): Promise<Response> {
    try {
      const scenarioId = Number(req.params.id);
      await this.checkUserScenarioOwnership(
        Number(req.headers["user"]),
        scenarioId
      );
      const updatedScenario = await this.scenarioService.update(
        { id: scenarioId } as ScenarioAttributes,
        req.body
      );
      return res.json(updatedScenario);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async delete(req: any, res: Response): Promise<Response> {
    try {
      const scenarioId = Number(req.params.id);
      await this.checkUserScenarioOwnership(
        Number(req.headers["user"]),
        scenarioId
      );
      await this.scenarioService.delete({
        id: scenarioId,
      } as ScenarioAttributes);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async runScenario(req: any, res: Response): Promise<Response> {
    try {
      const scenarioId = Number(req.params.id);
      await this.checkUserScenarioOwnership(
        Number(req.headers["user"]),
        scenarioId
      );
      const scenario = await this.scenarioService.getById(scenarioId);

      console.log(`Running scenario: ${scenario.name}`);

      await this.logService.create({
        scenarioId: scenarioId,
      });

      return res
        .status(200)
        .json({ message: `Scenario ${scenario.name} executed successfully.` });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  private async checkUserScenarioOwnership(
    userId: number,
    scenarioId: number
  ): Promise<void> {
    const scenarioDevices = await this.scenarioDeviceService.getById(
      scenarioId
    );
    const isUserScenario =
      scenarioDevices && scenarioDevices.deviceId === userId;

    if (!isUserScenario) {
      throw new Error("Access denied: You do not own this scenario.");
    }
  }
}

export default ScenarioController;
