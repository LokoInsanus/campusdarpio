import express from "express";

import { BebidaController } from "./controllers/BebidaController.js";
import { BlocoController } from "./controllers/BlocoController.js";
import { CampusController } from "./controllers/CampusController.js";
import { ClienteController } from "./controllers/ClienteController.js";
import { EntregadorController } from "./controllers/EntregadorController.js";
import { FuncionarioController } from "./controllers/FuncionarioController.js";
import { RefeicaoController } from "./controllers/RefeicaoController.js";
import { TipoDeRefeicaoController } from "./controllers/TipoDeRefeicaoController.js";

const routes = express.Router();

export default routes;