import { Campus } from "../models/Campus.js";

// Gabriel Oliveira Natalli Augusto

class CampusService {

    static async findAll() {
        const objs = await Campus.findAll({ include: { all: true, nested: true } });
        return objs;
    }


    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Campus.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req) {
        const { nome, endereco, quantidadeBlocos, status } = req.body;
        const obj = await Campus.create({ nome, endereco, quantidadeBlocos, status });
        return await Campus.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { nome, endereco, quantidadeBlocos, status } = req.body;
        const obj = await Campus.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw new Error("Campus não encontrado");
        Object.assign(obj, { nome, endereco, quantidadeBlocos, status });
        await obj.save();
        return await Campus.findByPk(id, { include: { all: true, nested: true } });
    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await Campus.findByPk(id);
        if (obj == null) throw new Error("Campus não encontrado");
        try {
            await obj.destroy();
        } catch (error) {
            throw new Error("Não foi possível deletar o Campus. Verifique se ele não está vinculado a outro registro."); //Talvez mudar comentario.
        }
    }
}