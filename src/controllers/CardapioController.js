import { CardapioService } from "../services/CardapioService.js";

class CardapioController {

  static async findAll(req, res, next) {
    CardapioService.findAll()
      .then(objs => res.json(objs))
      .catch(next);
  }

  static async findByPk(req, res, next) {
    CardapioService.findByPk(req)
      .then(obj => res.json(obj))
      .catch(next);
  }

  static async findByWeek(req, res, next) {
    CardapioService.findByWeek(req)
      .then(obj => res.json(obj))
      .catch(next);
  }

  static async create(req, res, next) {
    CardapioService.create(req)
      .then(obj => res.json(obj))
      .catch(next);
  }

  static async update(req, res, next) {
    CardapioService.update(req)
      .then(obj => res.json(obj))
      .catch(next);
  }

  static async delete(req, res, next) {
    CardapioService.delete(req)
      .then(obj => res.json(obj))
      .catch(next);
  }

  // Roger de Assis Tedesco - Total de refeições por tipo no cardápio
  static async TotaisTipoRefeicoesCardapioData(req, res, next) {
    CardapioService.TotaisTipoRefeicoesCardapioData(req)
      .then(resultados => res.json(resultados))
      .catch(next);
  }

}

export { CardapioController };