import express from "express";

// import { BebidaController } from "./controllers/BebidaController.js";
// import { BlocoController } from "./controllers/BlocoController.js";
import { CampusController } from "./controllers/CampusController.js";
import { ClienteController } from "./controllers/ClienteController.js";
import { EntregadorController } from "./controllers/EntregadorController.js";
import { FuncionarioController } from "./controllers/FuncionarioController.js";
import { RefeicaoController } from "./controllers/RefeicaoController.js";
// import { TipoDeRefeicaoController } from "./controllers/TipoDeRefeicaoController.js";

const routes = express.Router();

routes.get("/Campus", CampusController.findAll);
routes.get("/Campus/:id", CampusController.findByPk);
routes.post("/Campus", CampusController.create);
routes.put("/Campus/:id", CampusController.update);
routes.delete("/Campus/:id", CampusController.delete);

routes.get("/Cliente", ClienteController.findAll);
routes.get("/Cliente/:id", ClienteController.findByPk);
routes.post("/Cliente", ClienteController.create);
routes.put("/Cliente/:id", ClienteController.update);
routes.delete("/Cliente/:id", ClienteController.delete);

routes.get("/Entregador", EntregadorController.findAll);
routes.get("/Entregador/:id", EntregadorController.findByPk);
routes.post("/Entregador", EntregadorController.create);
routes.put("/Entregador/:id", EntregadorController.update);
routes.delete("/Entregador/:id", EntregadorController.delete);

routes.get("/Funcionario", FuncionarioController.findAll);
routes.get("/Funcionario/:id", FuncionarioController.findByPk);
routes.post("/Funcionario", FuncionarioController.create);
routes.put("/Funcionario/:id", FuncionarioController.update);
routes.delete("/Funcionario/:id", FuncionarioController.delete);

routes.get("/Refeicao", RefeicaoController.findAll);
routes.get("/Refeicao/:id", RefeicaoController.findByPk);
routes.post("/Refeicao", RefeicaoController.create);
routes.put("/Refeicao/:id", RefeicaoController.update);
routes.delete("/Refeicao/:id", RefeicaoController.delete);

export default routes;