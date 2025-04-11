import { Pedido } from "../models/Pedido.js";

// Gabriel Oliveira Natalli Augusto

class PedidoService {
  
    static async findAll() {
        const objs = await Pedido.findAll({ include: { all: true, nested: true } });
        return objs;
    }

    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Pedido.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req) { 
        const { nome, tipo, preco, quantidade } = req.body; //Acertar FK TIPO
        const obj = await Pedido.create({ nome, tipo, preco, quantidade });
        return await Pedido.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { nome, tipo, preco, quantidade } = req.body;
        const obj = await Pedido.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw new Error("Funcionario não encontrado");
        Object.assign(obj, { nome, tipo, preco, quantidade });
        await obj.save();
        return await Pedido.findByPk(id, { include: { all: true, nested: true } });
    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await Pedido.findByPk(id);
        if (obj == null) throw new Error("Pedido não encontrada");
        try {
            await obj.destroy();
        } catch (error) {
            throw new Error("Não foi possível deletar a Pedido. Verifique se ela não está vinculado a outro registro.");
        }
    }
}