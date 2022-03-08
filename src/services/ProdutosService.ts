import ResponseError from "../errors/ResponseError";
import validate from "../validators/validate";
import produtoValidador from "../validators/produtoValidator";
import { Const } from "../utils/const";
import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { Produto } from "../models/Produto";
import ProdutosRepositoryImp from "../repositories/ProdutosRepositoryImp";

interface IRequest {
  id?: number;
  nome: string;
  descricao: string;
  preco: string;
}

class ProdutosService {
  constructor(private produtosRepository: ProdutoRepository) {}
  async create({ nome, preco, descricao }: IRequest): Promise<Produto> {
    const produtoExists = await this.produtosRepository.findProdutoByName(nome);
    const body = { nome, preco, descricao };
    const data = await validate(produtoValidador, body);

    if (produtoExists) {
      throw new ResponseError(
        "Produto já existe.",
        Const.httpStatus.BAD_REQUEST
      );
    } else if (data.errors) {
      throw new ResponseError(data.errors, Const.httpStatus.BAD_REQUEST);
    } else {
      return await this.produtosRepository.create(body);
    }
  }
  async listing(): Promise<Produto[]> {
    try {
      return await this.produtosRepository.listing();
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id: number): Promise<Produto> {
    const produtoExist = await this.produtosRepository.verificationById(id);
    if (produtoExist) {
      throw new ResponseError(
        "Produto não encontrado.",
        Const.httpStatus.BAD_REQUEST
      );
    } else {
      return await this.produtosRepository.getById(id);
    }
  }
  async update({ id, nome, descricao, preco }: IRequest): Promise<Produto> {
    const body = { nome, preco, descricao };
    const produtoExists = await this.produtosRepository.verificationById(id);
    const data = await validate(produtoValidador, body);
    if (produtoExists) {
      throw new ResponseError(
        "Produto não encontrado",
        Const.httpStatus.BAD_REQUEST
      );
    } else if (data.errors) {
      throw new ResponseError(data.errors, Const.httpStatus.BAD_REQUEST);
    } else {
      return await this.produtosRepository.update(id, nome, descricao, preco);
    }
  }
  async delete(id: number): Promise<Produto> {
    const produtoExist = await this.produtosRepository.verificationById(id);
    if (produtoExist) {
      throw new ResponseError(
        "Produto não encontrado.",
        Const.httpStatus.BAD_REQUEST
      );
    } else {
      return await this.produtosRepository.delete(id);
    }
  }
}

export default new ProdutosService(ProdutosRepositoryImp);
