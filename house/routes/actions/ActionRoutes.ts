import { Router } from "express";
import ActionController from "../../controllers/actions/ActionController";

const router = Router();
const actionController = new ActionController();

router.get("/", actionController.getAll.bind(actionController));
router.get("/:id", actionController.getById.bind(actionController));
router.post("/", actionController.create.bind(actionController));
router.patch("/:id", actionController.update.bind(actionController));
router.delete("/:id", actionController.delete.bind(actionController));

export default router;
