import { Request, Response } from "express";
import { IImage } from "../models/Image";
import Image from "../models/Image";

class ImageController {
  static getImageByLabel = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const label = req.params.label.replaceAll(/-/g, " ");

    await Image.find({ label: { $regex: new RegExp(label, "i") } })
      .then((obj) => res.status(200).json(obj))
      .catch((err) =>
        res.status(402).json({
          message: "Não foi encontrado nenhum resultado com esse nome",
        })
      );
    return;
  };

  static getAllImages = async (req: Request, res: Response): Promise<void> => {
    const allImages = await Image.find();
    if (allImages.length === 0) {
      res
        .status(400)
        .json({ message: "Não foi encontrado imagens no banco de dados!" });
      return;
    } else {
      res.status(200).json(allImages);
      return;
    }
  };

  static createImage = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as IImage;
    console.log(body);
    if (!this.checkPayload(body, res)) {
      res.status(303).json({ message: "Os campos não podem estar vazios" });
      return;
    } else {
      await Image.create({
        label: body.label,
        url: body.url,
        width: body.width,
        height: body.height,
      })
        .then(() =>
          res.status(200).json({ message: "Imagem cadastrada com sucesso!" })
        )
        .catch((err) => res.status(402).json(err.message));
    }
  };

  static deleteImage = async (req: Request, res: Response): Promise<void> => {
    const imageId = req.params.id;
    const image = await Image.findById(imageId);
    if (!image) {
      res.status(400).json({ message: "Imagem não encontrada!" });
      return;
    } else {
      await Image.deleteOne({ where: { id: imageId } })
        .then(() =>
          res.status(200).json({ message: "Imagem deletada com sucesso!" })
        )
        .catch((err) => res.status(402).json(err.message));
      return;
    }
  };

  static deleteAllImages = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await Image.deleteMany()
      .then(() =>
        res
          .status(200)
          .json({ message: "Todos os registros foram deletados com sucesso!" })
      )
      .catch((err) => res.status(403).json(err.message));
  };

  static checkPayload = (payload: IImage, res: Response): Boolean => {
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
    } else {
      return true;
    }
  };
}

export default ImageController;
