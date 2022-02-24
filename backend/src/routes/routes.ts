import { Router } from "express";
import ImageController from "../controller/ImageController";

const router = Router();

router.get("/get-all", ImageController.getAllImages);
router.get("/get-image/:label", ImageController.getImageByLabel);

router.post("/register", ImageController.createImage);

router.delete("/delete/:id", ImageController.deleteImage);
router.delete("/delete-all", ImageController.deleteAllImages);

export default router;
