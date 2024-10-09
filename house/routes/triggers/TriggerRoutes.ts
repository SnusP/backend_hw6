import { Router } from "express";
import TriggerController from "../../controllers/triggers/TriggerController";

const router = Router();
const triggerController = new TriggerController();

router.get("/", triggerController.getAll.bind(triggerController));
router.get("/:id", triggerController.getById.bind(triggerController));
router.post("/", triggerController.create.bind(triggerController));
router.patch("/:id", triggerController.update.bind(triggerController));
router.delete("/:id", triggerController.delete.bind(triggerController));

export default router;
