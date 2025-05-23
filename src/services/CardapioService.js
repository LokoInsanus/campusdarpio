import { Cardapio } from "../models/Cardapio.js";
import { Bebida } from "../models/Bebida.js";
import { Refeicao } from "../models/Refeicao.js";
import sequelize from '../config/database-connection.js';
import { QueryTypes } from 'sequelize';

// Roger de Assis Tedesco

class CardapioService {

  static async findAll() {
    const objs = await Cardapio.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Cardapio.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const { data, descricao, bebidas = [], refeicoes = [] } = req.body;

    const t = await sequelize.transaction();
    try {
      await this.verificarRegrasDeNegocio(data, bebidas, refeicoes, t);

      const obj = await Cardapio.create({ data, descricao }, { transaction: t });

      if (bebidas.length > 0) {
        const bebidasEncontradas = await Promise.all(
          bebidas.map(id => Bebida.findByPk(id, { transaction: t }))
        );
        if (bebidasEncontradas.some(b => !b)) {
          throw new Error("Uma ou mais bebidas informadas não foram encontradas.");
        }
        await obj.addBebidas(bebidasEncontradas, { transaction: t });
      }

      if (refeicoes.length > 0) {
        const refeicoesEncontradas = await Promise.all(
          refeicoes.map(id => Refeicao.findByPk(id, { transaction: t }))
        );
        if (refeicoesEncontradas.some(r => !r)) {
          throw new Error("Uma ou mais refeições informadas não foram encontradas.");
        }
        await obj.addRefeicoes(refeicoesEncontradas, { transaction: t });
      }

      await t.commit();
      return await Cardapio.findByPk(obj.id, { include: { all: true, nested: true } });
    } catch (error) {
      await t.rollback();
      throw new Error(error.message || "Erro ao criar o cardápio");
    }
  }

  static async update(req) {
    const { id } = req.params;
    const { data, descricao, bebidas, refeicoes } = req.body;

    if (!data) throw new Error("O campo 'data' deve ser preenchido!");
    if (!descricao || descricao.trim() === "") throw new Error("O campo 'descricao' deve ser preenchido!");
    if (!Array.isArray(bebidas) || bebidas.length === 0) throw new Error("A(s) Bebida(s) do Cardápio deve(m) ser preenchida(s)!");
    if (!Array.isArray(refeicoes) || refeicoes.length === 0) throw new Error("A(s) Refeição(ões) do Cardápio deve(m) ser preenchida(s)!");

    const obj = await Cardapio.findByPk(id, { include: { all: true, nested: true } });
    if (!obj) throw new Error("Cardápio não encontrado!");

    obj.data = data;
    obj.descricao = descricao;
    await obj.save();

    const bebidasEncontradas = await Promise.all(bebidas.map(id => Bebida.findByPk(id)));
    if (bebidasEncontradas.some(b => !b)) throw new Error("Uma ou mais bebidas informadas não foram encontradas.");
    await obj.setBebidas(bebidasEncontradas);

    const refeicoesEncontradas = await Promise.all(refeicoes.map(id => Refeicao.findByPk(id)));
    if (refeicoesEncontradas.some(r => !r)) throw new Error("Uma ou mais refeições informadas não foram encontradas.");
    await obj.setRefeicoes(refeicoesEncontradas);

    return await Cardapio.findByPk(obj.id, { include: { all: true, nested: true } });
  }


  static async delete(req) {
    const { id } = req.params;
    const obj = await Cardapio.findByPk(id);
    if (!obj) throw 'Cardápio não encontrado!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível deletar um Cardápio!";
    }
  }

  static async verificarRegrasDeNegocio(data, bebidas, refeicoes, transaction) {
    await this.verificarRegraRN1(data, transaction);
    await this.verificarRegraRN2(data, bebidas, refeicoes, transaction);
    return true;
  }

  static async verificarRegraRN1(data, transaction) {
    const dataObj = new Date(data);
    const diaSemana = dataObj.getDay();
    const inicioSemana = new Date(dataObj);
    inicioSemana.setDate(dataObj.getDate() - diaSemana);
    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 6);

    const cardapiosSemana = await sequelize.query(
      `SELECT id FROM cardapios WHERE data BETWEEN :inicio AND :fim LIMIT 1;`,
      {
        replacements: {
          inicio: inicioSemana.toISOString().slice(0, 10),
          fim: fimSemana.toISOString().slice(0, 10)
        },
        type: QueryTypes.SELECT,
        transaction
      }
    );

    if (cardapiosSemana.length > 0) {
      throw new Error("Já existe um cardápio cadastrado para esta semana.");
    }
  }

  static async verificarRegraRN2(data, bebidas, refeicoes, transaction) {
    if ((bebidas.length + refeicoes.length) === 0) return;

    const [anterior] = await sequelize.query(
      `SELECT id FROM cardapios
     WHERE data < :data
     ORDER BY data DESC
     LIMIT 1;`,
      {
        replacements: { data },
        type: QueryTypes.SELECT,
        transaction
      }
    );

    if (!anterior) return;

    const cardapioId = anterior.id;

    const [usos] = await sequelize.query(
      `SELECT
       (SELECT COUNT(*) FROM cardapio_bebida WHERE cardapio_id = :id AND bebida_id IN (${bebidas.join(',') || 'NULL'})) AS bebidas_iguais,
       (SELECT COUNT(*) FROM cardapio_refeicao WHERE cardapio_id = :id AND refeicao_id IN (${refeicoes.join(',') || 'NULL'})) AS refeicoes_iguais;`,
      {
        replacements: { id: cardapioId },
        type: QueryTypes.SELECT,
        transaction
      }
    );

    const total = bebidas.length + refeicoes.length;
    const iguais = Number(usos.bebidas_iguais) + Number(usos.refeicoes_iguais);

    if (total > 0 && iguais / total > 0.5) {
      throw new Error("Mais da metade dos itens são iguais ao último cardápio. Varie os itens!");
    }
  }


}

export { CardapioService };
