import {
  Scenario,
  ScenarioAttributes,
  ScenarioCreationAttributes,
} from "../../models/scenarios/Scenario";

class ScenarioRepository {
  async findById(id: number): Promise<Scenario | null> {
    return await Scenario.findByPk(id);
  }

  async findAll(): Promise<Scenario[]> {
    return await Scenario.findAll();
  }

  async create(
    scenarioData: Omit<ScenarioCreationAttributes, "id">
  ): Promise<Scenario> {
    return await Scenario.create(scenarioData);
  }

  async update(
    scenario: ScenarioAttributes,
    data: Partial<ScenarioAttributes>
  ): Promise<[number, Scenario[]]> {
    return await Scenario.update(data, {
      where: { id: scenario.id },
      returning: true,
    });
  }

  async delete(scenario: ScenarioAttributes): Promise<number> {
    return await Scenario.destroy({
      where: { id: scenario.id },
    });
  }
}

export default ScenarioRepository;
