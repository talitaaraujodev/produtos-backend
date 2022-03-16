import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
const usersRoutes = Router();

usersRoutes.post("/login", UsuarioController.login);
usersRoutes.post("/register", UsuarioController.register);

module.exports = usersRoutes;