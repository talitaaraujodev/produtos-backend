import { Usuario } from "../models/Usuario";
import { UsuarioRepository } from "./UsuarioRepository";
import connect from "../database/connection";
import { sign } from "jsonwebtoken";
import auth from "../auth/auth";
import { compareSync } from "bcryptjs";
import ResponseError from "../errors/ResponseError";

class UsuarioRepositoryImp implements UsuarioRepository {
  constructor() {}
  public saveUser({ nome, email, password }): Promise<Usuario> {
    const user: Usuario = { nome, email, password };

    return new Promise((accept, reject) => {
      connect.query("INSERT INTO usuario SET ?", [user], (error, result) => {
        try {
          return accept(user);
        } catch {
          if (error) {
            return reject("Erro ao salvar usuário" + error);
          }
        }
      });
    });
  }

  public auth({ email, password }): Promise<any> {
    return new Promise((accept, reject) => {
      connect.query(
        `SELECT email, password FROM usuario where email='${email}'`,
        async (error, result) => {
          try {
            if (result.length != 0) {
              const hashPassword = result[0]["password"];
              const passwordMatched = await this.passwordMatched(
                password,
                hashPassword
              );
              if (passwordMatched) {
                const token = sign(
                  {
                    subject: result[0].id,
                    expiresIn: auth.jwt.expiresIn,
                  },
                  auth.jwt.secret
                );
                console.log(token);
                return accept({ token: token });
              }
            }
            return reject(
              new ResponseError("Usuario e/ou senha inválidos.", 400)
            );
          } catch (erro) {
            return reject(erro);
          }
        }
      );
    });
  }
  public findUserByEmail(email: string): Promise<any> {
    return new Promise((accept, reject) => {
      connect.query(
        `SELECT * FROM usuario WHERE email='${email}'`,
        (error, result) => {
          try {
            if (result.length === 0) {
              return accept(result != false);
            } else if (result.length != 0) {
              return accept(result != true);
            }
          } catch (erro) {
            if (error) {
              return reject("Erro ao buscar email: " + error);
            }
          }
        }
      );
    });
  }
  public passwordMatched(password: string, passwordHash: string): any {
    try {
      return compareSync(password, passwordHash);
    } catch (erro) {
      console.log(erro);
    }
  }
}

export default new UsuarioRepositoryImp();
