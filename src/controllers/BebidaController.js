import { BebidaService } from "../services/BebidaService.js";

// Roger

class BebidaController {
    static async findAll(req, res, next) {
        BebidaService.findAll()
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async findByPk(req, res, next) {
        BebidaService.findByPk(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async create(req, res, next) {
        BebidaService.create(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async update(req, res, next) {
        BebidaService.update(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async delete(req, res, next) {
        BebidaService.delete(req)
            .then(obj => res.json(obj))
            .catch(next);
    }
}

export { BebidaController };