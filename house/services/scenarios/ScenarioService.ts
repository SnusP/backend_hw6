import { Scenario, ScenarioAttributes } from "../../models/scenarios/Scenario";
import ScenarioRepository from "../../repositories/scenarios/ScenarioRepository";

class ScenarioService {
  private scenarioRepository: ScenarioRepository;

  constructor() {
    this.scenarioRepository = new ScenarioRepository();
  }

  async getById(id: number): Promise<Scenario> {
    const scenario = await this.scenarioRepository.findById(id);
    if (!scenario) {
      throw new Error("Scenario not found");
    }
    return scenario;
  }

  async getAll(): Promise<Scenario[]> {
    return await this.scenarioRepository.findAll();
  }

  async create(
    scenarioData: Omit<ScenarioAttributes, "id">
  ): Promise<Scenario> {
    return await this.scenarioRepository.create(scenarioData);
  }

  async update(
    scenario: ScenarioAttributes,
    scenarioData: Partial<ScenarioAttributes>
  ): Promise<Scenario> {
    const [updatedRowsCount, updatedScenario] =
      await this.scenarioRepository.update(scenario, scenarioData);
    if (updatedRowsCount === 0) {
      throw new Error("Scenario not found");
    }
    return updatedScenario[0];
  }

  async delete(scenario: ScenarioAttributes): Promise<number> {
    const deletedRowsCount = await this.scenarioRepository.delete(scenario);
    if (deletedRowsCount === 0) {
      throw new Error("Scenario not found");
    }
    return deletedRowsCount;
  }
}

export default ScenarioService;
