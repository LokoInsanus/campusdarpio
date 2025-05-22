import { Pedido } from "../models/Pedido.js";
import { Entregador } from "../models/Entregador.js";
import { Cliente } from "../models/Cliente.js";

import sequelize from '../config/database-connection.js';
import { QueryTypes } from 'sequelize';

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
    const { clienteId, cardapioId, refeicaoId, bebidaId, dataHora, campusId, blocoId } = req.body;
    // Validação de cliente (mantendo regra de negócio)
    if (await this.verificarRegrasDeNegocio({ body: { clienteId } })) {
      const t = await sequelize.transaction();
      try {
        const obj = await Pedido.create(
          { clienteId, cardapioId, refeicaoId, bebidaId, dataHora, campusId, blocoId },
          { transaction: t }
        );
        await t.commit();
        return await Pedido.findByPk(obj.id, { include: { all: true, nested: true } });
      } catch (error) {
        await t.rollback();
        throw error;
      }
    }
  }

  static async update(req) {
    const { id } = req.params;
    const { clienteId, cardapioId, refeicaoId, bebidaId, dataHora, campusId, blocoId } = req.body;
    const obj = await Pedido.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Pedido não encontrado!';
    const t = await sequelize.transaction();
    Object.assign(obj, { clienteId, cardapioId, refeicaoId, bebidaId, dataHora, campusId, blocoId });
    await obj.save({ transaction: t });
    try {
      await t.commit();
      return await Pedido.findByPk(obj.id, { include: { all: true, nested: true } });
    } catch (error) {
      await t.rollback();
      throw "Pelo menos um pedido não foi encontrado!";
    }
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Pedido.findByPk(id);
    if (obj == null) throw 'Pedido não encontrado!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover o pedido!";
    }
  }

  static async verificarRegrasDeNegocio(req) {
    const { clienteId } = req.body;

    // Regra 1: Não permitir dois pedidos não finalizados para o mesmo cliente
    const pedidoNaoFinalizado = await Pedido.findOne({
      where: {
        clienteId,
        fim_pedido: null
      }
    });
    if (pedidoNaoFinalizado) {
      throw "Já existe um pedido não finalizado para este cliente!";
    }

    // Regra 2: Não permitir pedidos de clientes bloqueados no sistema
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      throw "Cliente não encontrado!";
    }
    if (cliente.status === 'bloqueado') {
      throw "Cliente bloqueado no sistema!";
    }

    return true;
  }
}

export { PedidoService };