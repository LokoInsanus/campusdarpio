import { TipoDeRefeicaoService } from "../services/TipoDeRefeicaoService.js";

// Roger

class TipoDeRefeicaoController {
    static async findAll(req, res, next) {
        TipoDeRefeicaoService.findAll()
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async findByPk(req, res, next) {
        TipoDeRefeicaoService.findByPk(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async create(req, res, next) {
        TipoDeRefeicaoService.create(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async update(req, res, next) {
        TipoDeRefeicaoService.update(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async delete(req, res, next) {
        TipoDeRefeicaoService.delete(req)
            .then(obj => res.json(obj))
            .catch(next);
    }
}

export { TipoDeRefeicaoController };