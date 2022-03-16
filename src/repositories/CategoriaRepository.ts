import { Categoria } from "../models/Categoria";

interface ISalvarCategoriaDTO {
  tipo: string;
}
interface CategoriaRepository {
  create({ tipo }: ISalvarCategoriaDTO): Promise<Categoria>;
  listing(): Promise<Categoria[]>;
  getById(id: number): Promise<Categoria>;
  findCategoriaById(id: number):Promise<any>;
  findCategoriaByTipo(tipo:string):Promise<any>;
  delete(id: number): Promise<Categoria>;
  update(id: number, tipo: string): Promise<Categoria>;
}
export { CategoriaRepository, ISalvarCategoriaDTO };
