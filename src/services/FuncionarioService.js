import { Funcionario } from "../models/Funcionario.js";

class FuncionarioService {
  
    static async findAll() {
        const objs = await Funcionario.findAll({ include: { all: true, nested: true } });
        return objs;
    }

    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Funcionario.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req) {
        const { nome, cpf, cargo, telefone, endereco, data_de_emissao } = req.body;
        const obj = await Funcionario.create({ nome, cpf, cargo, telefone, endereco, data_de_emissao });
        return await Funcionario.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { nome, cpf, cargo, telefone, endereco, data_de_emissao } = req.body;
        const obj = await Funcionario.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw new Error("Funcionario não encontrado");
        Object.assign(obj, { nome, cpf, cargo, telefone, endereco, data_de_emissao });
        await obj.save();
        return await Funcionario.findByPk(id, { include: { all: true, nested: true } });
    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await Funcionario.findByPk(id);
        if (obj == null) throw new Error("Funcionario não encontrado");
        try {
            await obj.destroy();
        } catch (error) {
            throw new Error("Não foi possível deletar o Funcionario. Verifique se ele não está vinculado a outro registro.");
        }
    }
}