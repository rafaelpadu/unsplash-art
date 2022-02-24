"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imageScheema = new mongoose_1.Schema({
    label: { type: String, required: true },
    url: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() },
});
const Image = (0, mongoose_1.model)("Image", imageScheema);
exports.default = Image;
//# sourceMappingURL=Image.js.map