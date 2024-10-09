import { Router } from "express";
import deviceRoutes from "./devices/DeviceRoutes";
import scenarioRoutes from "./scenarios/ScenarioRoutes";
import triggerRoutes from "./triggers/TriggerRoutes";
import actionRoutes from "./actions/ActionRoutes";
import logRoutes from "./logs/LogRoutes";
import ScenarioDevicesRoutes from "./scenarioDevices/ScenarioDevicesRoutes";
const router = Router();

router.use("/devices", deviceRoutes);
router.use("/scenarios", scenarioRoutes);
router.use("/scenarioDevices", ScenarioDevicesRoutes);
router.use("/triggers", triggerRoutes);
router.use("/actions", actionRoutes);
router.use("/logs", logRoutes);

export default router;
