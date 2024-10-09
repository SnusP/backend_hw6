import {
  Device,
  DeviceAttributes,
  DeviceCreationAttributes,
} from "../../models/devices/Device";

class DeviceRepository {
  async findById(id: number): Promise<Device | null> {
    return await Device.findByPk(id);
  }

  async findAll(id: number): Promise<Device[]> {
    return await Device.findAll({ where: { userId: id } });
  }

  async create(
    deviceData: Omit<DeviceCreationAttributes, "id">
  ): Promise<Device> {
    return await Device.create(deviceData);
  }

  async update(
    device: DeviceAttributes,
    data: Partial<DeviceAttributes>
  ): Promise<[number, Device[]]> {
    return await Device.update(data, {
      where: { id: device.id },
      returning: true,
    });
  }

  async delete(device: DeviceAttributes): Promise<number> {
    return await Device.destroy({
      where: { id: device.id },
    });
  }
}

export default DeviceRepository;
