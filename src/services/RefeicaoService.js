import { Refeicao } from "../models/Refeicao.js";

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

    static async create(req) {
        const { nome, tipo, preco, quantidade } = req.body;
        const obj = await Refeicao.create({ nome, tipo, preco, quantidade });
        return await Refeicao.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { nome, tipo, preco, quantidade } = req.body;
        const obj = await Refeicao.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw new Error("Funcionario não encontrado");
        Object.assign(obj, { nome, tipo, preco, quantidade });
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
}