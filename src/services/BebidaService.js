import { Bebida } from "../models/Bebida.js";
import sequelize from '../config/database-connection.js';
import { QueryTypes } from 'sequelize';

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

  // Gabriel Oliveira Natalli Augusto - Função de relatório: bebidas mais pedidas
  static async BebidasMaisPedidas(req) {
    let { campus_id, bloco_id, data } = req.params;

    campus_id = campus_id === "null" ? null : campus_id;
    bloco_id = bloco_id === "null" ? null : bloco_id;
    if (data && data !== "null") {
      data = new Date(data).toISOString().slice(0, 10);
    } else {
      data = null;
    }

    const resultados = await sequelize.query(
      `SELECT b.nome, COUNT(*) AS quantidade
     FROM pedidos p
     INNER JOIN bebidas b ON p.bebida_id = b.id
     WHERE (:campus_id IS NULL OR p.campus_id = :campus_id)
       AND (:bloco_id IS NULL OR p.bloco_id = :bloco_id)
       AND (:data IS NULL OR DATE(p.data_hora) = :data)
     GROUP BY b.nome
     ORDER BY quantidade DESC`,
      {
        type: QueryTypes.SELECT,
        replacements: { campus_id, bloco_id, data }
      }
    );

    return resultados;
  }

}

export { BebidaService };