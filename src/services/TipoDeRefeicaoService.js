import { TipoDeRefeicao } from "../models/TipoDeRefeicao.js";

// Roger

class TipoDeRefeicaoService {

  static async findAll() {
    const objs = await TipoDeRefeicao.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await TipoDeRefeicao.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const { tipo } = req.body;
    const obj = await TipoDeRefeicao.create({ tipo });
    return await TipoDeRefeicao.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async update(req) {
    const { id } = req.params;
    const { tipo } = req.body;
    const obj = await TipoDeRefeicao.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Tipo de Refeição não encontrada!';
    Object.assign(obj, { tipo });
    return await obj.save();
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await TipoDeRefeicao.findByPk(id);
    if (obj == null) throw 'Tipo de Refeição não encontrada!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover um Tipo de Refeição associado a refeição!";
    }
  }

}

export { TipoDeRefeicaoService };