import { Request, Response } from "express";
import DeviceService from "../../services/devices/DeviceService";
import { DeviceAttributes } from "../../models/devices/Device";

class DeviceController {
  private deviceService: DeviceService;

  constructor() {
    this.deviceService = new DeviceService();
  }

  private checkOwnership(device: DeviceAttributes, userId: number): boolean {
    return device.userId === userId;
  }

  async getById(req: any, res: Response): Promise<Response> {
    try {
      const device = await this.deviceService.getById(Number(req.params.id));

      if (!this.checkOwnership(device, Number(req.headers["user"]))) {
        return res.status(403).json({ error: "This is not your device" });
      }

      return res.json(device);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async getAll(req: any, res: Response): Promise<Response> {
    const devices = await this.deviceService.getAll(
      Number(req.headers["user"])
    );
    return res.json(devices);
  }

  async create(req: any, res: Response): Promise<Response> {
    try {
      req.body.userId = Number(req.headers["user"]);
      const device = await this.deviceService.create(
        req.body as Omit<DeviceAttributes, "id">
      );
      return res.status(201).json(device);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: any, res: Response): Promise<Response> {
    try {
      const device = await this.deviceService.getById(Number(req.params.id));

      if (!this.checkOwnership(device, Number(req.headers["user"]))) {
        return res.status(403).json({ error: "This is not your device" });
      }

      const updatedDevice = await this.deviceService.update(
        { id: Number(req.params.id) } as DeviceAttributes,
        req.body
      );
      return res.json(updatedDevice);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async delete(req: any, res: Response): Promise<Response> {
    try {
      const device = await this.deviceService.getById(Number(req.params.id));

      if (!this.checkOwnership(device, Number(req.headers["user"]))) {
        return res.status(403).json({ error: "This is not your device" });
      }

      await this.deviceService.delete({
        id: Number(req.params.id),
      } as DeviceAttributes);
      return res.status(204).send({ res: "Device deleted successfully" });
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default DeviceController;
