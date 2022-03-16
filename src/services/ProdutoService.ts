import ResponseError from "../errors/ResponseError";
import validate from "../validators/validate";
import produtoValidador from "../validators/produtoValidator";
import { Const } from "../utils/const";
import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { CategoriaRepository } from "../repositories/CategoriaRepository";
import { Produto } from "../models/Produto";
import ProdutoRepositoryImp from "../repositories/ProdutoRepositoryImp";
import CategoriaRepositoryImp from "../repositories/CategoriaRepositoryImp";

interface IRequest {
  id?: number;
  nome: string;
  descricao: string;
  preco: string;
  categoria_id: number;
}
class ProdutoService {
  constructor(
    private produtosRepository: ProdutoRepository,
    private categoriaRepository: CategoriaRepository
  ) {}
  async create({
    nome,
    preco,
    descricao,
    categoria_id,
  }: IRequest): Promise<Produto> {
    const produtoAlreadyExists =
      await this.produtosRepository.findProdutoByName(nome);
    const categoriaAlreadyExists =
      await this.categoriaRepository.findCategoriaById(categoria_id);
    const body = { nome, preco, descricao, categoria_id };
    const data = await validate(produtoValidador, body);

    if (produtoAlreadyExists) {
      throw new ResponseError(
        "Produto já existe.",
        Const.httpStatus.BAD_REQUEST
      );
    } else if (!categoriaAlreadyExists) {
      throw new ResponseError(
        "Categoria não existe",
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
    const produtoAlreadyExists = await this.produtosRepository.findProdutoById(
      id
    );

    if (!produtoAlreadyExists) {
      throw new ResponseError(
        "Produto não encontrado.",
        Const.httpStatus.BAD_REQUEST
      );
    } else {
      return await this.produtosRepository.getById(id);
    }
  }
  async update({
    id,
    nome,
    descricao,
    preco,
    categoria_id,
  }: IRequest): Promise<Produto> {
    const body = { nome, preco, descricao, categoria_id };
    const produtoAlreadyExists = await this.produtosRepository.findProdutoById(
      id
    );
    const data = await validate(produtoValidador, body);
    if (!produtoAlreadyExists) {
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
    const produtoAlreadyExists = await this.produtosRepository.findProdutoById(
      id
    );
    if (!produtoAlreadyExists) {
      throw new ResponseError(
        "Produto não encontrado.",
        Const.httpStatus.BAD_REQUEST
      );
    } else {
      return await this.produtosRepository.delete(id);
    }
  }
}

export default new ProdutoService(ProdutoRepositoryImp, CategoriaRepositoryImp);
