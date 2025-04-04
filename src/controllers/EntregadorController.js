import { EntregadorService } from '../services/EntregadorService.js';

class EntregadorController {
    static async findAll(req, res, next) {
        EntregadorService.findAll()
            .then((objs) => res.json(objs))
            .catch(next);
    }

    static async findByPk(req, res, next) {
        EntregadorService.findByPk(req)
            .then((obj) => res.json(obj))
            .catch(next);
    }

    static async create(req, res, next) {
        EntregadorService.create(req)
            .then((obj) => res.status(201).json(obj))
            .catch(next);
    }

    static async update(req, res, next) {
        EntregadorService.update(req)
            .then((obj) => res.json(obj))
            .catch(next);
    }

    static async delete(req, res, next) {
        EntregadorService.delete(req)
            .then(() => res.status(204).send())
            .catch(next);
    }
}

export default EntregadorController;