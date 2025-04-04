import { BlocoService } from "../services/BlocoService.js";

// Roger

class BlocoController {
  
  static async findAll(req, res, next) {
    BlocoService.findAll()
        .then(objs => res.json(objs))
        .catch(next);
  }

  static async findByPk(req, res, next) {
    BlocoService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async findByCampus(req, res, next) {
    BlocoService.findByCampus(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async create(req, res, next) {
    BlocoService.create(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async update(req, res, next) {
    BlocoService.update(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async delete(req, res, next) {
    BlocoService.delete(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

}

export { BlocoController };