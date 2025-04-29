import { Router } from "express";
import {
  sanitizeProductInput,
  findAll,
  findOne,
  add,
  update,
  remove
} from "./product.controler.js"; // corregí el nombre si estaba mal (era controler.js)
import { upload } from "../utils/upload.js";

export const productRouter = Router();

productRouter.get("/", findAll);
productRouter.get("/:id", findOne);
productRouter.post("/", upload.single("image"), sanitizeProductInput, add);
productRouter.put("/:id", upload.single("image"), sanitizeProductInput, update);
productRouter.patch("/:id", upload.single("image"), sanitizeProductInput, update);
productRouter.delete("/:id", remove);
