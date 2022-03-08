import { Request, Response } from "express";
import usuarioService from "../services/UsuarioService";
import { Const } from "../utils/const";
class UsuarioController {
    async register(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, email, password } = req.body;
            const usuario = await usuarioService.register({ nome, email, password });
            return res.status(Const.httpStatus.CREATED).json({
                message: "Usuário criado com sucesso.",
                usuario: usuario,
            })
        } catch (error) {
            return res.status(error.status).json(error);
        }
    }
    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const data = await usuarioService.login({ email, password });
            console.log(data)
            return res.status(Const.httpStatus.OK).json(data)
        } catch (error) {
            console.log(error)
            return res.status(error.status).json(error)
        }
    }
}
export default new UsuarioController();