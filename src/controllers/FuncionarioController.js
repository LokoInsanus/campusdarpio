import { FuncionarioService } from "../services/FuncionarioService.js";

class FuncionarioController {
    static async findAll(req, res, next) {
        FuncionarioController.findAll()
            .then((objs) => res.json(objs))
            .catch(next);
    }

    static async findByPk(req, res, next) {
        FuncionarioController.findByPk(req)
            .then((obj) => res.json(obj))
            .catch(next);
    }

    static async create(req, res, next) {
        FuncionarioController.create(req)
            .then((obj) => res.status(201).json(obj))
            .catch(next);
    }

    static async update(req, res, next) {
        FuncionarioController.update(req)
            .then((obj) => res.json(obj))
            .catch(next);
    }

    static async delete(req, res, next) {
        FuncionarioController.delete(req)
            .then(() => res.status(204).send())
            .catch(next);
    }
}

export default FuncionarioController;