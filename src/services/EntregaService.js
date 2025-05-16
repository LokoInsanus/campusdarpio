import { Entrega } from "../models/Entrega.js";
import { Pedido } from "../models/Pedido.js";
import { Entregador } from "../models/Entregador.js";

import sequelize from '../config/database-connection.js';
import { QueryTypes } from 'sequelize';

// Marcelo de Oliveira Costa Pereira

class EntregaService {

  static async findAll() {
    const objs = await Entrega.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Entrega.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const { pedidoId, entregadorId, inicio_entrega, fim_entrega } = req.body;
    // Checagem explícita se os IDs existem
    const pedido = await Pedido.findByPk(pedidoId);
    if (!pedido) throw "Pedido não encontrado!";
    const entregador = await Entregador.findByPk(entregadorId);
    if (!entregador) throw "Entregador não encontrado!";
    if (await this.verificarRegrasDeNegocio(req)) {
      const t = await sequelize.transaction();
      try {
        const obj = await Entrega.create(
          { pedidoId, entregadorId, inicio_entrega, fim_entrega },
          { transaction: t }
        );
        await t.commit();
        return await Entrega.findByPk(obj.id, { include: { all: true, nested: true } });
      } catch (error) {
        await t.rollback();
        throw error;
      }
    }
  }

  static async update(req) {
    const { id } = req.params;
    const { pedidoId, entregadorId, inicio_entrega, fim_entrega } = req.body;
    const obj = await Entrega.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Entrega não encontrada!';
    const t = await sequelize.transaction();
    Object.assign(obj, { pedidoId, entregadorId, inicio_entrega, fim_entrega });
    await obj.save({ transaction: t });
    try {
      await t.commit();
      return await Entrega.findByPk(obj.id, { include: { all: true, nested: true } });
    } catch (error) {
      await t.rollback();
      throw "Pelo menos uma entrega não foi encontrada!";
    }
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Entrega.findByPk(id);
    if (obj == null) throw 'Entrega não encontrado!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover a entrega!";
    }
  }

  static async verificarRegrasDeNegocio(req) {
    const { pedidoId, entregadorId, inicio_entrega, fim_entrega } = req.body;

    // Regra 1: Não permitir mais de uma entrega para um mesmo pedido
    const entregaExistente = await Entrega.findOne({ where: { pedidoId } });
    if (entregaExistente) {
      throw "Já existe uma entrega para este pedido!";
    }

    // Regra 2: Atualizar status do entregador caso a entrega ultrapasse uma hora
    if (inicio_entrega && fim_entrega) {
      const inicio = new Date(inicio_entrega);
      const fim = new Date(fim_entrega);
      const diffMs = fim - inicio;
      const diffHoras = diffMs / (1000 * 60 * 60);
      if (diffHoras > 1) {
      const entregador = await Entregador.findByPk(entregadorId);
      if (entregador) {
        entregador.status = 'inativo';
        await entregador.save();
      }
      }
    }

    return true;
  }
}

export { EntregaService };