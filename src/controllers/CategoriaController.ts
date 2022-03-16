import { Request, Response } from "express";
import categoriaService from "../services/CategoriaService";
import { Const } from "./../utils/const";

class CategoriaController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { tipo } = req.body;
      const categoria = await categoriaService.create({ tipo });
      return res.status(Const.httpStatus.CREATED).json({
        message: "Categoria criada com sucesso.",
        categoria: categoria,
      });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async listing(req: Request, res: Response): Promise<Response> {
    try {
      const getCategorias = await categoriaService.listing();
      return res.status(Const.httpStatus.OK).json(getCategorias);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const categoria = await categoriaService.getById(id);
      return res.status(Const.httpStatus.OK).json(categoria);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      await categoriaService.delete(id);
      return res.status(Const.httpStatus.OK).json({
        message: "Categoria deletado com sucesso.",
      });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    const { id, tipo } = req.body;
    try {
      await categoriaService.update({
        id,
        tipo,
      });
      return res.json({
        message: "Categoria alterada com sucesso.",
      });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}
export default new CategoriaController();
