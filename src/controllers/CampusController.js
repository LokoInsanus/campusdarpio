import { CampusService } from '../services/CampusService.js';

//Gabriel Oliveira Natalli Augusto

class CampusController {
    static async findAll(req, res, next) {
        CampusService.findAll()
            .then((objs) => res.json(objs))
            .catch(next);
    }

    static async findByPk(req, res, next) {
        CampusService.findByPk(req)
            .then((obj) => res.json(obj))
            .catch(next);
    }

    static async create(req, res, next) {
        CampusService.create(req)
            .then((obj) => res.status(201).json(obj))
            .catch(next);
    }

    static async update(req, res, next) {
        CampusService.update(req)
            .then((obj) => res.json(obj))
            .catch(next);
    }

    static async delete(req, res, next) {
        CampusService.delete(req)
            .then(() => res.status(204).send())
            .catch(next);
    }
}

export { RefeicaoController } ;