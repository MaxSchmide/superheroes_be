import express from "express";
import imageController from "../controllers/image.controller";

const router = express.Router();

router.post("/", imageController.upload);
router.delete("/:id", imageController.delete);

export default router;
