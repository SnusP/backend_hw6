import { Router } from "express";
import LogController from "../../controllers/logs/LogController";

const router = Router();
const logController = new LogController();

router.get("/", logController.getAll.bind(logController));
router.get("/:id", logController.getById.bind(logController));
router.post("/", logController.create.bind(logController));
router.delete("/:id", logController.delete.bind(logController));

export default router;
