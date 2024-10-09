import { Router } from "express";
import ScenarioController from "../../controllers/scenarios/ScenarioController";

const router = Router();
const scenarioController = new ScenarioController();

router.get("/", scenarioController.getAll.bind(scenarioController));
router.get("/:id", scenarioController.getById.bind(scenarioController));
router.post("/", scenarioController.create.bind(scenarioController));
router.patch("/:id", scenarioController.update.bind(scenarioController));
router.delete("/:id", scenarioController.delete.bind(scenarioController));
router.get("/:id/run", scenarioController.runScenario.bind(scenarioController));

export default router;
