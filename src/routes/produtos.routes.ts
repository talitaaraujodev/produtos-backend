import { Router } from "express";
import ProdutosController from "../controllers/ProdutosController";
import authValidator
 from "../auth/authValidator";
const produtosRoutes = Router();

produtosRoutes.post("/produtos", authValidator, ProdutosController.create);
produtosRoutes.get("/produtos", authValidator, ProdutosController.listing);
produtosRoutes.get("/produtos/:id", authValidator, ProdutosController.getById);

produtosRoutes.delete("/produtos/:id", authValidator, ProdutosController.delete);
produtosRoutes.put("/produtos",authValidator, ProdutosController.update);

module.exports = produtosRoutes;
