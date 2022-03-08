import { Produto } from "../models/Produto";

interface ISalvarProdutoDTO {
    nome: string,
    preco: string,
    descricao: string
}
interface ProdutoRepository {
    create({ nome, preco, descricao }: ISalvarProdutoDTO): Promise<Produto>;
    listing(): Promise<Produto[]>;
    getById(id: number): Promise<Produto>;
    verificationById(id: number): Promise<Boolean>;
    findProdutoByName(nome: string): Promise<Boolean>;
    delete(id: number): Promise<Produto>;
    update(id: number, nome: string, descricao: string, preco: string): Promise<Produto>;
}
export { ProdutoRepository, ISalvarProdutoDTO };
