import { Categoria } from "../models/Categoria";
import { CategoriaRepository } from "./CategoriaRepository";
import connect from "../database/connection";

class CategoriaRepositoryImp implements CategoriaRepository {
  constructor() {}
  create({ tipo }): Promise<Categoria> {
    const categoria: Categoria = { tipo };
    
    return new Promise((accept, reject) => {
      connect.query(
        "INSERT INTO categoria SET ?",
        [categoria],
        (error, result) => {
          try {
            return accept(categoria);
          } catch {
            if (error) {
              return reject("Erro ao salvar" + error);
            }
          }
        }
      );
    });
  }
  listing(): Promise<Categoria[]> {
    return new Promise((accept, reject) => {
      connect.query("SELECT * FROM categoria", (error, result) => {
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
  getById(id: number): Promise<Categoria> {
    return new Promise((accept, reject) => {
      connect.query(
        `SELECT * FROM categoria WHERE id=${id}`,
        (error, result) => {
          try {
            return accept(result);
          } catch (erro) {
            if (error) {
              return reject("Erro ao buscar produto" + error);
            }
          }
        }
      );
    });
  }
  findCategoriaById(id: number): Promise<any> {
    return new Promise((accept, reject) => {
      connect.query(
        `SELECT * FROM categoria WHERE id=${id}`,
        (error, result) => {
          try {
            if (result.length === 0) {
              return accept((result = false));
            } else if (result.length != 0) {
              return accept((result = true));
            }
          } catch {
            if (error) {
              return reject("Error ao buscar por id" + error);
            }
          }
        }
      );
    });
  }
  findCategoriaByTipo(tipo: string): Promise<any> {
    return new Promise((accept, reject) => {
      connect.query(
        `SELECT * FROM categoria WHERE tipo='${tipo}'`,
        (error, result) => {
          try {
            if (result.length === 0) {
              return accept(result = false);
            } else if (result.length != 0) {
              return accept(result = true);
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
  update(id: number, tipo: string): Promise<Categoria> {
    return new Promise((accept, reject) => {
      connect.query(
        `UPDATE categoria SET tipo='${tipo}' WHERE id='${id}' `,
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
  delete(id: number): Promise<Categoria> {
    return new Promise((accept, reject) => {
      connect.query(`DELETE FROM categoria WHERE id=${id}`, (error, result) => {
        try {
          return accept(result);
        } catch (erro) {
          if (error) {
            return reject("Erro ao deletar " + error);
          }
        }
      });
    });
  }
}
export default new CategoriaRepositoryImp();
