import { Device, DeviceAttributes } from "../../models/devices/Device";
import DeviceRepository from "../../repositories/devices/DeviceRepository";

class DeviceService {
  private deviceRepository: DeviceRepository;

  constructor() {
    this.deviceRepository = new DeviceRepository();
  }

  async getById(id: number): Promise<Device> {
    const device = await this.deviceRepository.findById(id);
    if (!device) {
      throw new Error("Device not found");
    }
    return device;
  }

  async getAll(id: number): Promise<Device[]> {
    return await this.deviceRepository.findAll(id);
  }

  async create(deviceData: Omit<DeviceAttributes, "id">): Promise<Device> {
    return await this.deviceRepository.create(deviceData);
  }

  async update(
    device: DeviceAttributes,
    deviceData: Partial<DeviceAttributes>
  ): Promise<Device> {
    const [updatedRowsCount, updatedDevice] =
      await this.deviceRepository.update(device, deviceData);
    if (updatedRowsCount === 0) {
      throw new Error("Device not found");
    }
    return updatedDevice[0];
  }

  async delete(device: DeviceAttributes): Promise<number> {
    const deletedRowsCount = await this.deviceRepository.delete(device);
    if (deletedRowsCount === 0) {
      throw new Error("Device not found");
    }
    return deletedRowsCount;
  }
}

export default DeviceService;
