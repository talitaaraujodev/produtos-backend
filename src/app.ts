import connection from "./database/connection";
import express from "express";
import cors from "cors";
const produtoRoutes = require("./routes/produto.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const categoriaRoutes = require("./routes/categoria.routes");
class App {
  private express: express.Application;
  public constructor() {
    this.express = express();
    this.database();
    this.middlewares();
  }

  private middlewares(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(produtoRoutes);
    this.express.use(usuarioRoutes);
    this.express.use(categoriaRoutes);
  }

  private database(): void {
    connection.connect((erro: any) => {
      if (erro) {
        return erro;
      }
      return;
    });
  }
  public getApp() {
    return this.express;
  }
}
export default new App().getApp();
