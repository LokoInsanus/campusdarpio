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
    const { data, descricao, bebidas, refeicoes } = req.body;
    if (await this.verificarRegrasDeNegocio(req)) {
      const t = await sequelize.transaction();
      try {
        const obj = await Cardapio.create({ data, descricao }, { transaction: t });

        if (bebidas && bebidas.length > 0) {
          const bebidasEncontradas = await Promise.all(bebidas.map(id => Bebida.findByPk(id, { transaction: t })));
          if (bebidasEncontradas.some(b => !b)) throw new Error("Uma ou mais bebidas informadas não foram encontradas.");
          await obj.addBebidas(bebidasEncontradas, { transaction: t });
        }

        if (refeicoes && refeicoes.length > 0) {
          const refeicoesEncontradas = await Promise.all(refeicoes.map(id => Refeicao.findByPk(id, { transaction: t })));
          if (refeicoesEncontradas.some(r => !r)) throw new Error("Uma ou mais refeições informadas não foram encontradas.");
          await obj.addRefeicoes(refeicoesEncontradas, { transaction: t });
        }

        await t.commit();
        return await Cardapio.findByPk(obj.id, { include: { all: true, nested: true } });
      } catch (error) {
        await t.rollback();
        throw new Error("Erro ao criar o cardápio");
      }
    } else {
      throw new Error("Regras de negócio não foram atendidas.");
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

  static async verificarRegrasDeNegocio(req) {
    const { data, bebidas = [], refeicoes = [] } = req.body;

    // RN1: Não permitir dois cardápios para a mesma semana.
    const dataObj = new Date(data);
    const diaSemana = dataObj.getDay();

    const inicioSemana = new Date(dataObj);
    inicioSemana.setDate(dataObj.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1));

    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 6);

    const cardapiosSemana = await sequelize.query(
      `SELECT id FROM cardapios WHERE data BETWEEN :inicio AND :fim LIMIT 1;`,
      {
        replacements: {
          inicio: inicioSemana.toISOString().slice(0, 10),
          fim: fimSemana.toISOString().slice(0, 10)
        },
        type: QueryTypes.SELECT
      }
    );

    if (cardapiosSemana.length > 0) {
      throw new Error("Já existe um cardápio cadastrado para esta semana.");
    }

    // RN2: Verificar repetição de itens nos últimos 14 dias.
    const dataLimite = new Date(dataObj);
    dataLimite.setDate(dataObj.getDate() - 14);

    const bebidaIds = bebidas.length > 0 ? bebidas.join(',') : 'NULL';
    const refeicaoIds = refeicoes.length > 0 ? refeicoes.join(',') : 'NULL';

    const [result] = await sequelize.query(
      `SELECT COUNT(DISTINCT cb.bebida_id) AS bebidas_usadas, COUNT(DISTINCT cr.refeicao_id) AS refeicoes_usadas FROM cardapios c LEFT JOIN cardapio_bebida cb ON c.id = cb.cardapio_id AND cb.bebida_id IN (${bebidaIds}) LEFT JOIN cardapio_refeicao cr ON c.id = cr.cardapio_id AND cr.refeicao_id IN (${refeicaoIds}) WHERE c.data >= :dataLimite;`, { replacements: { dataLimite: dataLimite.toISOString().slice(0, 10) }, type: QueryTypes.SELECT }
    );


    const totalItens = bebidas.length + refeicoes.length;
    const itensRepetidos = Number(result.bebidas_usadas) + Number(result.refeicoes_usadas);

    if (totalItens > 0 && itensRepetidos / totalItens > 0.5) {
      throw new Error("Mais da metade dos itens já foram usados em cardápios recentes. Varie os itens!");
    }

    return true;
  }

}

export { CardapioService };
