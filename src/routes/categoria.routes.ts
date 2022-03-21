import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController";
const categoriaRoutes = Router();

categoriaRoutes.post("/categorias", CategoriaController.create);
categoriaRoutes.get("/categorias", CategoriaController.listing);
categoriaRoutes.get("/categorias/:id", CategoriaController.getById);
categoriaRoutes.delete("/categorias/:id", CategoriaController.delete);
categoriaRoutes.put("/categorias", CategoriaController.update);

module.exports = categoriaRoutes;