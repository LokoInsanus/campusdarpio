import { EntregaService } from "../services/EntregaService.js";

// Marcelo de Oliveira Costa Pereira

class EntregaController {

  static async findAll(req, res, next) {
    EntregaService.findAll()
      .then(objs => res.json(objs))
      .catch(next);
  }

  static async findByPk(req, res, next) {
    EntregaService.findByPk(req)
      .then(obj => res.json(obj))
      .catch(next);
  }

  static async create(req, res, next) {
    EntregaService.create(req)
      .then(obj => res.json(obj))
      .catch(next);
  }

  static async update(req, res, next) {
    EntregaService.update(req)
      .then(obj => res.json(obj))
      .catch(next);
  }

  static async delete(req, res, next) {
    EntregaService.delete(req)
      .then(obj => res.json(obj))
      .catch(next);
  }

  static async totaisEntregadorData(req, res, next) {
    EntregaService.findTotaisEntregadorData(req)
      .then(objs => res.json(objs))
      .catch(next);
  }

  // Roger de Assis Tedesco - Tempo médio de entrega por entregador
  static async TempoMedioPorEntregador(req, res, next) {
    EntregaService.TempoMedioPorEntregador(req)
      .then(resultados => res.json(resultados))
      .catch(next);
  }


}

export { EntregaController };