import ResponseError from "../errors/ResponseError";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import UsuarioRepositoryImp from "../repositories/UsuarioRepositoryImp";
import { Const } from "../utils/const";
import registerValidador from "../validators/registerValidator";
import loginValidador from "../validators/loginValidator";
import validate from "../validators/validate";
import { Usuario } from "./../models/Usuario";
import { hash } from "bcryptjs";

interface IRequestRegister {
  id?: number;
  nome: string;
  email: string;
  password: string;
}
interface IRequestLogin {
  email: string;
  password: string;
}

class UsuarioService {
  constructor(private usuarioRepository: UsuarioRepository) { }
  async register({
    nome,
    email,
    password,
  }: IRequestRegister): Promise<Usuario> {
    const emailExists = await this.usuarioRepository.findUserByEmail(email);
    const body = { nome, email, password };
    const data = await validate(registerValidador, body);
    console.log(emailExists);
    if (emailExists) {
      throw new ResponseError(
        "Usuário já possui cadastro.",
        Const.httpStatus.BAD_REQUEST
      );
    } else if (data.errors) {
      throw new ResponseError(data.errors, Const.httpStatus.BAD_REQUEST);
    } else {
      const hashedPassword = await hash(password, 8);
      password = hashedPassword;
      return await this.usuarioRepository.saveUser({ nome, email, password });
    }
  }
  async login(body: IRequestLogin): Promise<Usuario> {
    const data = await validate(loginValidador, body);

    if (data.errors) {
      throw new ResponseError(data.errors, Const.httpStatus.BAD_REQUEST);
    }

    return await this.usuarioRepository.auth(body);
  }
}

export default new UsuarioService(UsuarioRepositoryImp);
