import { Request, Response } from "express";
import produtoService from "../services/ProdutoService";
import { Const } from "../utils/const";
class ProdutosController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
 
      const { nome, descricao, preco, categoria_id } = req.body;
      const produto = await produtoService.create({
        nome,
        descricao,
        preco,
        categoria_id,
      });
      return res.status(Const.httpStatus.CREATED).json({
        message: "Produto criado com sucesso.",
        produto: produto,
      });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async listing(req: Request, res: Response): Promise<Response> {
    const getProdutos = await produtoService.listing();
    try {
      return res.status(Const.httpStatus.OK).json(getProdutos);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const produto = await produtoService.getById(id);
      return res.status(Const.httpStatus.OK).json(produto);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      await produtoService.delete(id);
      return res.status(Const.httpStatus.OK).json({
        message: "Produto deletado com sucesso.",
      });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    const { id, nome, descricao, preco, categoria_id } = req.body;
    try {
      await produtoService.update({
        id,
        nome,
        descricao,
        preco,
        categoria_id,
      });

      return res.json({
        message: "Produto alterado com sucesso.",
      });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}
export default new ProdutosController();
