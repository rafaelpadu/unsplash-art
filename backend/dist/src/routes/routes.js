"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImageController_1 = __importDefault(require("controller/ImageController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/post", ImageController_1.default.createImage);
exports.default = router;
//# sourceMappingURL=routes.js.map