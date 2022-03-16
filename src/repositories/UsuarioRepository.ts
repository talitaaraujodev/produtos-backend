
import { Usuario } from "../models/Usuario";

interface ILoginUsuarioDTO {
    email: string,
    password: string
}
interface IRegisterUsuarioDTO {
    nome: string,
    email: string,
    password: string
}
interface UsuarioRepository {
    saveUser({ nome, email, password }: IRegisterUsuarioDTO): Promise<Usuario>;
    auth({ email, password }: ILoginUsuarioDTO): Promise<any>;
    findUserByEmail(email: string):Promise<any>;
    passwordMatched(password: string, passwordHash: string): any;
}
export { UsuarioRepository, ILoginUsuarioDTO, IRegisterUsuarioDTO };