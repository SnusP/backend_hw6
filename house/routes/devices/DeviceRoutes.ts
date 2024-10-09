import { Router } from "express";
import DeviceController from "../../controllers/devices/DeviceController";

const router = Router();
const deviceController = new DeviceController();

router.get("/", deviceController.getAll.bind(deviceController));
router.get("/:id", deviceController.getById.bind(deviceController));
router.post("/", deviceController.create.bind(deviceController));
router.patch("/:id", deviceController.update.bind(deviceController));
router.delete("/:id", deviceController.delete.bind(deviceController));

export default router;
