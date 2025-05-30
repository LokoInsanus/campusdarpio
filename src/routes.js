import express from "express";

import { BebidaController } from "./controllers/BebidaController.js";
import { BlocoController } from "./controllers/BlocoController.js";
import { CampusController } from "./controllers/CampusController.js";
import { ClienteController } from "./controllers/ClienteController.js";
import { EntregadorController } from "./controllers/EntregadorController.js";
import { FuncionarioController } from "./controllers/FuncionarioController.js";
import { RefeicaoController } from "./controllers/RefeicaoController.js";
import { EntregaController } from "./controllers/EntregaController.js";
import { PedidoController } from "./controllers/PedidoController.js";
import { CardapioController } from "./controllers/CardapioController.js";

const routes = express.Router();

routes.get("/Bebida", BebidaController.findAll);
routes.get("/Bebida/:id", BebidaController.findByPk);
routes.post("/Bebida", BebidaController.create);
routes.put("/Bebida/:id", BebidaController.update);
routes.delete("/Bebida/:id", BebidaController.delete);

routes.get("/Bloco", BlocoController.findAll);
routes.get("/Bloco/:id", BlocoController.findByPk);
routes.post("/Bloco", BlocoController.create);
routes.put("/Bloco/:id", BlocoController.update);
routes.delete("/Bloco/:id", BlocoController.delete);

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

routes.get("/Entrega", EntregaController.findAll);
routes.get("/Entrega/:id", EntregaController.findByPk);
routes.post("/Entrega", EntregaController.create);
routes.put("/Entrega/:id", EntregaController.update);
routes.delete("/Entrega/:id", EntregaController.delete);
routes.get("/Entrega/TotaisEntregadorData/:entregador_Id/:dataInicio/:dataFim", EntregaController.totaisEntregadorData);

routes.get("/Pedido", PedidoController.findAll);
routes.get("/Pedido/:id", PedidoController.findByPk);
routes.post("/Pedido", PedidoController.create);
routes.put("/Pedido/:id", PedidoController.update);
routes.delete("/Pedido/:id", PedidoController.delete);
routes.get("/Pedido/TotaisCampusBlocoClienteData/:campus_id/:bloco_id/:cliente_id/:data_hora", PedidoController.totaisCampusBlocoClienteData);

routes.get("/Cardapio", CardapioController.findAll);
routes.get("/Cardapio/:id", CardapioController.findByPk);
routes.post("/Cardapio", CardapioController.create);
routes.put("/Cardapio/:id", CardapioController.update);
routes.delete("/Cardapio/:id", CardapioController.delete);

export default routes;