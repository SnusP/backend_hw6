import { Router } from "express";
import ScenarioDeviceController from "../../controllers/scenarioDevices/ScenarioDeviceController";

const router = Router();
const controller = new ScenarioDeviceController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.patch("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
