import { RefeicaoService } from '../services/RefeicaoService.js';

//Gabriel Oliveira Natalli Augusto

class RefeicaoController {
    static async findAll(req, res, next) {
        RefeicaoService.findAll()
            .then((objs) => res.json(objs))
            .catch(next);
    }

    static async findByPk(req, res, next) {
        RefeicaoService.findByPk(req)
            .then((obj) => res.json(obj))
            .catch(next);
    }

    static async create(req, res, next) {
        RefeicaoService.create(req)
            .then((obj) => res.status(201).json(obj))
            .catch(next);
    }

    static async update(req, res, next) {
        RefeicaoService.update(req)
            .then((obj) => res.json(obj))
            .catch(next);
    }

    static async delete(req, res, next) {
        RefeicaoService.delete(req)
            .then(() => res.status(204).send())
            .catch(next);
    }

    // Gabriel Oliveira Natalli Augusto - Função de relatório: refeições mais pedidas
    // Controller
    static async RefeicoesMaisPedidas(req, res, next) {
        RefeicaoService.RefeicoesMaisPedidas(req)
            .then(resultados => res.json(resultados))
            .catch(next);
    }
}

export { RefeicaoController } ;