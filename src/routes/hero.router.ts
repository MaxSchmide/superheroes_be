import express from "express";
import heroController from "../controllers/hero.controller";

const router = express.Router();

router.get("/", heroController.read);
router.post("/", heroController.create);
router.get("/:id", heroController.readOne);
router.put("/:id", heroController.update);
router.delete("/:id", heroController.remove);
export default router;
