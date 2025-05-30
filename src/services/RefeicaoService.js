import { Campus } from "../models/Campus.js";
import { Refeicao } from "../models/Refeicao.js";
import sequelize from '../config/database-connection.js';
import { QueryTypes } from "sequelize";

// Gabriel Oliveira Natalli Augusto

class RefeicaoService {

    static async findAll() {
        const objs = await Refeicao.findAll({ include: { all: true, nested: true } });
        return objs;
    }

    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Refeicao.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async findByTipoDeRefeicao(req) {
        const { id } = req.params;
        const objs = await Refeicao.findAll({ where: { tipo: id }, include: { all: true, nested: true } });
        return objs;
    }

    static async create(req) {
        const { nome, descricao, tipo, preco, quantidade } = req.body;

        const obj = await Refeicao.create({
            nome,
            descricao,
            tipo,
            preco,
            quantidade
        });

        return await Refeicao.findByPk(obj.id, {
            include: { all: true, nested: true }
        });
    }

    static async update(req) {
        const { id } = req.params;
        const { nome, descricao, tipo, preco, quantidade } = req.body;

        const obj = await Refeicao.findByPk(id, { include: { all: true, nested: true } });
        if (!obj) throw new Error("Refeição não encontrada");

        Object.assign(obj, {
            nome,
            descricao,
            tipo,
            preco,
            quantidade
        });

        await obj.save();
        return await Refeicao.findByPk(id, { include: { all: true, nested: true } });
    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await Refeicao.findByPk(id);
        if (obj == null) throw new Error("Refeicao não encontrada");
        try {
            await obj.destroy();
        } catch (error) {
            throw new Error("Não foi possível deletar a Refeicao. Verifique se ela não está vinculado a outro registro.");
        }
    }

    // Gabriel Oliveira Natalli Augusto - Função de relatório: refeições mais pedidas
    static async RefeicoesMaisPedidas(req) {
        let { campus_id, bloco_id, data } = req.params;

        campus_id = campus_id === "null" ? null : campus_id;
        bloco_id = bloco_id === "null" ? null : bloco_id;
        if (data && data !== "null") {
            data = new Date(data).toISOString().slice(0, 10);
        } else {
            data = null;
        }

        const resultados = await sequelize.query(
            `SELECT r.nome, COUNT(*) AS quantidade
     FROM pedidos p
     INNER JOIN refeicoes r ON p.refeicao_id = r.id
     WHERE (:campus_id IS NULL OR p.campus_id = :campus_id)
       AND (:bloco_id IS NULL OR p.bloco_id = :bloco_id)
       AND (:data IS NULL OR DATE(p.data_hora) = :data)
     GROUP BY r.nome
     ORDER BY quantidade DESC`,
            {
                type: QueryTypes.SELECT,
                replacements: { campus_id, bloco_id, data }
            }
        );

        return resultados;
    }
}

export { RefeicaoService };