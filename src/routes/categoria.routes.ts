import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController";
import authValidator from "../auth/authValidator";
const categoriaRoutes = Router();

categoriaRoutes.post("/categorias",authValidator, CategoriaController.create);
categoriaRoutes.get("/categorias", authValidator, CategoriaController.listing);
categoriaRoutes.get("/categorias/:id", authValidator, CategoriaController.getById);
categoriaRoutes.delete("/categorias/:id", authValidator, CategoriaController.delete);
categoriaRoutes.put("/categorias", authValidator, CategoriaController.update);

module.exports = categoriaRoutes;