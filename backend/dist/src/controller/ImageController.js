"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Image_1 = __importDefault(require("../models/Image"));
class ImageController {
}
_a = ImageController;
ImageController.getImageByLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const label = req.params.label.replaceAll(/-/g, " ");
    yield Image_1.default.find({ label: { $regex: new RegExp(label, "i") } })
        .then((obj) => res.status(200).json(obj))
        .catch((err) => res.status(402).json({
        message: "Não foi encontrado nenhum resultado com esse nome",
    }));
    return;
});
ImageController.getAllImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allImages = yield Image_1.default.find();
    if (allImages.length === 0) {
        res
            .status(400)
            .json({ message: "Não foi encontrado imagens no banco de dados!" });
        return;
    }
    else {
        res.status(200).json(allImages);
        return;
    }
});
ImageController.createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    if (!_a.checkPayload(body, res)) {
        res.status(303).json({ message: "Os campos não podem estar vazios" });
        return;
    }
    else {
        yield Image_1.default.create({
            label: body.label,
            url: body.url,
            width: body.width,
            height: body.height,
        })
            .then(() => res.status(200).json({ message: "Imagem cadastrada com sucesso!" }))
            .catch((err) => res.status(402).json(err.message));
    }
});
ImageController.deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageId = req.params.id;
    const image = yield Image_1.default.findById(imageId);
    if (!image) {
        res.status(400).json({ message: "Imagem não encontrada!" });
        return;
    }
    else {
        yield Image_1.default.deleteOne({ where: { id: imageId } })
            .then(() => res.status(200).json({ message: "Imagem deletada com sucesso!" }))
            .catch((err) => res.status(402).json(err.message));
        return;
    }
});
ImageController.deleteAllImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Image_1.default.deleteMany()
        .then(() => res
        .status(200)
        .json({ message: "Todos os registros foram deletados com sucesso!" }))
        .catch((err) => res.status(403).json(err.message));
});
ImageController.checkPayload = (payload, res) => {
    if (!payload.label) {
        res.status(300).json({ message: "O campo label não pode estar vazio!" });
        return false;
    }
    if (!payload.url) {
        res.status(300).json({ message: "O campo url não pode estar vazio!" });
        return false;
    }
    if (!payload.width) {
        res.status(300).json({ message: "O campo width não pode estar vazio!" });
        return false;
    }
    if (!payload.height) {
        res.status(300).json({ message: "O campo height não pode estar vazio!" });
        return false;
    }
    else {
        return true;
    }
};
exports.default = ImageController;
//# sourceMappingURL=ImageController.js.map