import {
  ScenarioDevice,
  ScenarioDeviceAttributes,
} from "../../models/scenarioDevices/ScenarioDevice";
import ScenarioDeviceRepository from "../../repositories/scenarioDevices/ScenarioDeviceRepository";
import { Device } from "../../models/devices/Device";

class ScenarioDeviceService {
  private scenarioDeviceRepository: ScenarioDeviceRepository;

  constructor() {
    this.scenarioDeviceRepository = new ScenarioDeviceRepository();
  }

  async getById(id: number): Promise<ScenarioDevice> {
    const scenarioDevice = await this.scenarioDeviceRepository.findById(id);
    if (!scenarioDevice) {
      throw new Error("Not Found");
    }
    return scenarioDevice;
  }

  async getAll(): Promise<ScenarioDevice[]> {
    return await this.scenarioDeviceRepository.findAll();
  }

  async create(data: ScenarioDeviceAttributes): Promise<ScenarioDevice> {
    return await this.scenarioDeviceRepository.create(data);
  }

  async update(
    scenarioDevice: ScenarioDeviceAttributes,
    data: Partial<ScenarioDeviceAttributes>
  ): Promise<ScenarioDevice> {
    const [updatedRowsCount, updatedScenarioDevice] =
      await this.scenarioDeviceRepository.update(scenarioDevice, data);
    if (updatedRowsCount === 0) {
      throw new Error("ScenarioDevice not found");
    }
    return updatedScenarioDevice[0];
  }

  async delete(id: number): Promise<number> {
    const deletedRowsCount = await this.scenarioDeviceRepository.delete(id);
    if (deletedRowsCount === 0) {
      throw new Error("ScenarioDevice not found");
    }
    return deletedRowsCount;
  }

  async getDevicesByScenarioId(scenarioId: number): Promise<Device[]> {
    const scenarioDevices =
      await this.scenarioDeviceRepository.findByScenarioId(scenarioId);
    if (!scenarioDevices || scenarioDevices.length === 0) {
      throw new Error("No devices found for this scenario");
    }
    return scenarioDevices.map((scenarioDevice) => scenarioDevice.device);
  }
}

export default ScenarioDeviceService;
