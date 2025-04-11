import { Bebida } from "../models/Bebida.js";

// Roger

class BebidaService {

  static async findAll() {
    const objs = await Bebida.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Bebida.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const { nome, tipo, preco, quantidade } = req.body;
    const obj = await Bebida.create({ nome, tipo, preco, quantidade });
    return await Bebida.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async update(req) {
    const { id } = req.params;
    const { nome, tipo, preco, quantidade } = req.body;
    const obj = await Bebida.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Bebida não encontrada!';
    Object.assign(obj, { nome, tipo, preco, quantidade });
    return await obj.save();
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Bebida.findByPk(id);
    if (obj == null) throw 'Bebida não encontrada!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover uma Bebida associado a cardápio ou pedido!";
    }
  }

}

export { BebidaService };