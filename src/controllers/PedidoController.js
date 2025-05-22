import { PedidoService } from "../services/PedidoService.js";

// Gabriel Oliveira Natalli Augusto

class PedidoController {
  
  static async findAll(req, res, next) {
    PedidoService.findAll()
        .then(objs => res.json(objs))
        .catch(next);
  }

  static async findByPk(req, res, next) {
    PedidoService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async create(req, res, next) {
    PedidoService.create(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async update(req, res, next) {
    PedidoService.update(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async delete(req, res, next) {
    PedidoService.delete(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

}

export { PedidoController };