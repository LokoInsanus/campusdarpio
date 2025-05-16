import { Cardapio } from "../models/Cardapio.js";
import { Bebida } from "../models/Bebida.js";
import { Refeicao } from "../models/Refeicao.js";


import sequelize from '../config/database-connection.js';
import { DATE, QueryTypes } from 'sequelize';

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

  static async findByWeek(req) {
    const { inicio, termino } = req.params;
    const obj = await sequelize.query("SELECT * FROM cardapios WHERE data >= :inicio AND data <= :termino", { replacements: { inicio: inicio, termino: termino }, type: QueryTypes.SELECT })
    return obj;
  }

  static async create(req) {
    const { data, descricao, bebidas, refeicoes } = req.body;
    if (await verificarRegrasDeNegocio(req)) {
      const t = await sequelize.transaction();
      const obj = await Cardapio.create({ data, descricao }, { transaction: t });
      try{
          await Promise.all(bebidas.map(bebida => obj.createBebida({  }, { transaction: t })));
      } catch (error){

      }

      try{

      } catch (error){
        
      }

      return await Cardapio.findByPk(obj.id, { include: { all: true, nested: true } });
    };
  }

// if(bebidas == null) throw 'A(s) Bebida(s) do Cardápio deve(m) ser preenchida(s)!';
// if (refeicoes == null) throw 'A(s) Refeição(ões) do Cardápio deve(m) ser preenchida(s)!';

  static async update(req) {
  const { id } = req.params;
  const { data, descricao, bebida, refeicao } = req.body;
  if (bebida == null) throw 'A(s) Bedida(s) do Cardápio deve(m) ser preenchida(s)!';
  if (refeicao == null) throw 'A(s) Refeição(ões) do Cardápio deve(m) ser preenchida(s)!';
  const obj = await Cardapio.findByPk(id, { include: { all: true, nested: true } });
  if (obj == null) throw 'Cardápio não encontrado!';
  Object.assign(obj, { data, descricao, bebidaId: bebida, refeicaoId: refeicao });
  await obj.save();
  return await Cardapio.findByPk(obj.id, { include: { all: true, nested: true } });
}

  static async delete (req) {
  const { id } = req.params;
  const obj = await Cardapio.findByPk(id);
  if (obj == null)
    throw 'Cardápio não encontrado!';
  try {
    await obj.destroy();
    return obj;
  } catch (error) {
    throw "Não é possível deletar um Cardápio!";
  }
}

  static async verificarRegrasDeNegocio(req){

}

}

export { CardapioService };