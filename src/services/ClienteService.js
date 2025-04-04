import { Cliente } from "../models/Cliente.js";

ClienteService = class ClienteService {
    static async findAll() {
        const objs = await Cliente.findAll({ include: { all: true, nested: true } });
        return objs;
    }

    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Cliente.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req) {
        const { nome, cpf, telefone, endereco, data_de_emissao } = req.body;
        const obj = await Cliente.create({ nome, cpf, telefone, endereco, data_de_emissao });
        return await Cliente.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { nome, cpf, telefone, endereco, data_de_emissao } = req.body;
        const obj = await Cliente.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw new Error("Cliente não encontrado");
        Object.assign(obj, { nome, cpf, telefone, endereco, data_de_emissao });
        await obj.save();
        return await Cliente.findByPk(id, { include: { all: true, nested: true } });
    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await Cliente.findByPk(id);
        if (obj == null) throw new Error("Cliente não encontrado");
        try {
            await obj.destroy();
        } catch (error) {
            throw new Error("Não foi possível deletar o Cliente. Verifique se ele não está vinculado a outro registro.");
        }
    }
}

export { ClienteService };