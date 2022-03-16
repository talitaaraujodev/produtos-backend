import ResponseError from "../errors/ResponseError";
import validate from "../validators/validate";
import categoriaValidator from "../validators/categoriaValidator";
import { Const } from "../utils/const";
import { Categoria } from "../models/Categoria";
import { CategoriaRepository } from "../repositories/CategoriaRepository";
import CategoriaRepositoryImp from "../repositories/CategoriaRepositoryImp";

interface IRequest {
  id?: number;
  tipo: string;
}
class CategoriaService {
  constructor(private categoriaRepository: CategoriaRepository) {}
  async create({ tipo }: IRequest): Promise<Categoria> {
    const categoriaAlreadyExists = await this.categoriaRepository.findCategoriaByTipo(
      tipo
    );
    const body = { tipo };
    const data = await validate(categoriaValidator, body);
    if (categoriaAlreadyExists) {
      throw new ResponseError(
        "Categoria já existe",
        Const.httpStatus.BAD_REQUEST
      );
    } else if (data.errors) {
      throw new ResponseError(data.errors, Const.httpStatus.BAD_REQUEST);
    } else {
      return await this.categoriaRepository.create(body);
    }
  }
  async listing(): Promise<Categoria[]> {
    try {
      return await this.categoriaRepository.listing();
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id: number): Promise<Categoria> {
    const categoriaAlreadyExists= await this.categoriaRepository.findCategoriaById(id);
    if (!categoriaAlreadyExists) {
      throw new ResponseError(
        "Categoria não encontrado.",
        Const.httpStatus.BAD_REQUEST
      );
    } else {
      return await this.categoriaRepository.getById(id);
    }
  }
  async update({ id, tipo }: IRequest): Promise<Categoria> {
    const body = { id, tipo };
    const categoriaAlreadyExists = await this.categoriaRepository.findCategoriaById(id);
    const data = await validate(categoriaValidator, body);
    if (!categoriaAlreadyExists) {
      throw new ResponseError(
        "Categoria não encontrado",
        Const.httpStatus.BAD_REQUEST
      );
    } else if (data.errors) {
      throw new ResponseError(data.errors, Const.httpStatus.BAD_REQUEST);
    } else {
      return await this.categoriaRepository.update(id, tipo);
    }
  
}
  async delete(id: number): Promise<Categoria> {
    const categoriaAlreadyExists= await this.categoriaRepository.findCategoriaById(id);
    if (!categoriaAlreadyExists) {
      throw new ResponseError(
        "Categoria não encontrado.",
        Const.httpStatus.BAD_REQUEST
      );
    } else {
      return await this.categoriaRepository.delete(id);
    }
  }
}
export default new CategoriaService(CategoriaRepositoryImp);
