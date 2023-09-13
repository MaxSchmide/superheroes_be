import express from "express";
import heroController from "../controllers/hero.controller";

const router = express.Router();

router.get("/", heroController.getAll);
router.post("/", heroController.create);

export default router;
