import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController";
import authValidator
 from "../auth/authValidator";
const produtoRoutes = Router();

produtoRoutes.post("/produtos", authValidator, ProdutoController.create);
produtoRoutes.get("/produtos", authValidator, ProdutoController.listing);
produtoRoutes.get("/produtos/:id", authValidator, ProdutoController.getById);
produtoRoutes.delete("/produtos/:id", authValidator, ProdutoController.delete);
produtoRoutes.put("/produtos",authValidator, ProdutoController.update);

module.exports = produtoRoutes;
