"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ImageController_1 = __importDefault(require("../controller/ImageController"));
const router = (0, express_1.Router)();
router.get("/get-all", ImageController_1.default.getAllImages);
router.get("/get-image/:label", ImageController_1.default.getImageByLabel);
router.post("/register", ImageController_1.default.createImage);
router.delete("/delete/:id", ImageController_1.default.deleteImage);
router.delete("/delete-all", ImageController_1.default.deleteAllImages);
exports.default = router;
//# sourceMappingURL=routes.js.map