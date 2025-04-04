import { Bloco } from "../models/Bloco.js";

// Roger

class BlocoService {

  static async findAll() {
    const objs = await Bloco.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Bloco.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async findByCampus(req) {
    const { id } = req.params;
    const objs = await Bloco.findAll({ where: { campusId: id }, include: { all: true, nested: true } });
    return objs;
  }

  static async create(req) {
    const { nome, tipo, capacidade, descricao, campus } = req.body;
    if (campus == null) throw 'O Campus do Bloco deve ser preenchido!';
    const obj = await Bloco.create({ nome, tipo, capacidade, descricao, campusId: campus.id });
    return await Bloco.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async update(req) {
    const { id } = req.params;
    const { nome, tipo, capacidade, descricao, campus } = req.body;
    if (uf == null) throw 'O Campus do Bloco deve ser preenchido!';
    const obj = await Bloco.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Bloco não encontrado!';
    Object.assign(obj, { nome, tipo, capacidade, descricao, campusId: campus.id });
    await obj.save();
    return await Bloco.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Cidade.findByPk(id);
    if (obj == null)
      throw 'Bloco não encontrado!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover um Bloco com campus!";
    }
  }

}

export { BlocoService };