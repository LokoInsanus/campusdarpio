import { ClienteService } from '../services/ClienteService.js';

// Marcelo de Oliveira Costa Pereira

class ClienteController {
    static async findAll(req, res, next) {
        ClienteService.findAll()
            .then((objs) => res.json(objs))
            .catch(next);
    }

    static async findByPk(req, res, next) {
        ClienteService.findByPk(req)
            .then((obj) => res.json(obj))
            .catch(next);
    }

    static async create(req, res, next) {
        ClienteService.create(req)
            .then((obj) => res.status(201).json(obj))
            .catch(next);
    }

    static async update(req, res, next) {
        ClienteService.update(req)
            .then((obj) => res.json(obj))
            .catch(next);
    }

    static async delete(req, res, next) {
        ClienteService.delete(req)
            .then(() => res.status(204).send())
            .catch(next);
    }
}

export { ClienteController };