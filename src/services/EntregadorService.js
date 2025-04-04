import { Entregador } from "../models/Entregador.js";

class EntregadorService {
    static async findAll() {
        const objs = await Entregador.findAll({ include: { all: true, nested: true } });
        return objs;
    }

    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Entregador.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req) {
        const { nome, cpf, telefone, endereco, data_de_emissao } = req.body;
        const obj = await Entregador.create({ nome, cpf, telefone, endereco, data_de_emissao });
        return await Entregador.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { nome, cpf, telefone, endereco, data_de_emissao } = req.body;
        const obj = await Entregador.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw new Error("Entregador não encontrado");
        Object.assign(obj, { nome, cpf, telefone, endereco, data_de_emissao });
        await obj.save();
        return await Entregador.findByPk(id, { include: { all: true, nested: true } });
    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await Entregador.findByPk(id);
        if (obj == null) throw new Error("Entregador não encontrado");
        try {
            await obj.destroy();
        } catch (error) {
            throw new Error("Não foi possível deletar o Entregador. Verifique se ele não está vinculado a outro registro.");
        }
    }

}

export default new EntregadorService();