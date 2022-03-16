import { Produto } from "../models/Produto";

interface ISalvarProdutoDTO {
    nome: string,
    preco: string,
    descricao: string,
    categoria_id: number
}
interface ProdutoRepository {
    create({ nome, preco, descricao, categoria_id }: ISalvarProdutoDTO): Promise<Produto>;
    listing(): Promise<Produto[]>;
    getById(id: number): Promise<Produto>;
    findProdutoById(id: number): Promise<any>;
    findProdutoByName(nome: string): Promise<any>;
    delete(id: number): Promise<Produto>;
    update(id: number, nome: string, descricao: string, preco: string): Promise<Produto>;
}
export { ProdutoRepository, ISalvarProdutoDTO };
