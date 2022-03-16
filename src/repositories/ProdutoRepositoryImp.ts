import { Produto } from "../models/Produto";
import { ProdutoRepository } from "./ProdutoRepository";
import connect from "../database/connection";

class ProdutoRepositoryImp implements ProdutoRepository {
  constructor() {}
  async create({ nome, preco, descricao, categoria_id }): Promise<Produto> {
    const produto: Produto = { nome, preco, descricao, categoria_id };

    return new Promise((accept, reject) => {
      connect.query("INSERT INTO produto SET ?", [produto], (error, result) => {
        try {
          return accept(produto);
        } catch {
          if (error) {
            return reject("Erro ao salvar" + error);
          }
        }
      });
    });
  }
  async listing(): Promise<Produto[]> {
    return new Promise((accept, reject) => {
      connect.query("SELECT * FROM produto", (error, result) => {
        try {
          if (result.length === 0) {
            return accept((result = []));
          }
          return accept(result);
        } catch {
          if (error) {
            return reject("Erro ao listar" + error);
          }
        }
      });
    });
  }

  async getById(id: number): Promise<Produto> {
    return new Promise((accept, reject) => {
      connect.query(`SELECT * FROM produto WHERE id=${id}`, (error, result) => {
        try {
          return accept(result);
        } catch (erro) {
          if (error) {
            return reject("Erro ao buscar produto" + error);
          }
        }
      });
    });
  }
  async findProdutoById(id: number): Promise<any> {
    return new Promise((accept, reject) => {
      connect.query(`SELECT * FROM produto WHERE id=${id}`, (error, result) => {
        try {
          if (result.length === 0) {
            return accept((result = false));
          } else if (result.length != 0) {
            return accept((result = true));
          }
        } catch (erro) {
          if (error) {
            return reject("Erro ao buscar produto " + error);
          }
        }
      });
    });
  }
  async findProdutoByName(nome: string): Promise<any> {
    return new Promise((accept, reject) => {
      connect.query(
        `SELECT * FROM produto WHERE nome='${nome}'`,
        (error, result) => {
          try {
            if (result.length === 0) {
              return accept((result = false));
            } else if (result.length != 0) {
              return accept((result = true));
            }
          } catch (erro) {
            if (error) {
              return reject("Erro ao buscar nome" + error);
            }
          }
        }
      );
    });
  }
  async update(
    id: number,
    nome: string,
    descricao: string,
    preco: string
  ): Promise<Produto> {
    return new Promise((accept, reject) => {
      connect.query(
        `UPDATE produto SET nome='${nome}', preco='${preco}', descricao='${descricao}' WHERE id='${id}' `,
        (error, result) => {
          try {
            return accept(result);
          } catch {
            if (error) {
              return reject("Erro ao alterar" + error);
            }
          }
        }
      );
    });
  }
  async delete(id: number): Promise<Produto> {
    return new Promise((accept, reject) => {
      connect.query(`DELETE FROM produto WHERE id=${id}`, (error, result) => {
        try {
          return accept(result);
        } catch {
          if (error) {
            return reject("Erro ao deletar " + error);
          }
        }
      });
    });
  }
}
export default new ProdutoRepositoryImp();
