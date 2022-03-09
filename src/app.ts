import connection from "./database/connection";
import express from "express";
import cors from "cors";
const produtosRoutes = require("./routes/produtos.routes");
const usuarioRoutes = require("./routes/users.routes")
class App {
  private express: express.Application;
  public constructor() {
    this.express = express();
    this.database();
    this.middlewares();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors({origin: '*', optionsSuccessStatus: 200}));
    this.express.use(produtosRoutes);
    this.express.use(usuarioRoutes);
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
