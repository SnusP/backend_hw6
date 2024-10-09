import {
  ScenarioDevice,
  ScenarioDeviceAttributes,
} from "../../models/scenarioDevices/ScenarioDevice";
import Device from "../../models/devices/Device";

class ScenarioDeviceRepository {
  async findById(id: number): Promise<ScenarioDevice | null> {
    return await ScenarioDevice.findByPk(id);
  }

  async findAll(): Promise<ScenarioDevice[]> {
    return await ScenarioDevice.findAll();
  }

  async create(data: ScenarioDeviceAttributes): Promise<ScenarioDevice> {
    return await ScenarioDevice.create(data);
  }

  async update(
    scenarioDevice: ScenarioDeviceAttributes,
    data: Partial<ScenarioDeviceAttributes>
  ): Promise<[number, ScenarioDevice[]]> {
    return await ScenarioDevice.update(data, {
      where: { id: scenarioDevice.id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return await ScenarioDevice.destroy({
      where: { id: id },
    });
  }

  async findByScenarioId(scenarioId: number): Promise<ScenarioDevice[]> {
    return await ScenarioDevice.findAll({
      where: { scenarioId },
      include: [{ model: Device, as: "device" }],
    });
  }
}

export default ScenarioDeviceRepository;
