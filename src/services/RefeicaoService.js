import { Campus } from "../models/Campus.js";
import { Refeicao } from "../models/Refeicao.js";
import { TipoDeRefeicao } from "../models/TipoDeRefeicao.js";

// Gabriel Oliveira Natalli Augusto

class RefeicaoService {
  
    static async findAll() {
        const objs = await Refeicao.findAll({ include: { all: true, nested: true } });
        return objs;
    }

    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Refeicao.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async findByTipoDeRefeicao(req) {
        const { id } = req.params;
        const objs = await Refeicao.findAll({ where: { tipoderefeicaoId: id }, include: { all: true, nested: true } });
        return objs;
      }

      static async create(req) {
        const { nome, descricao, tipo, preco, quantidade } = req.body;
    
        const tipoEncontrado = await TipoDeRefeicao.findOne({ where: { tipo } });
    
        if (!tipoEncontrado) {
            throw new Error(`Tipo de refeição não encontrado.`);
        }
    
        const obj = await Refeicao.create({
            nome,
            descricao,
            tipoderefeicaoId: tipoEncontrado.id,
            preco,
            quantidade
        });
    
        return await Refeicao.findByPk(obj.id, {
            include: { all: true, nested: true }
        });
    }

    static async update(req) {
        const { id } = req.params;
        const { nome, tipo, preco, quantidade } = req.body;
        const obj = await Refeicao.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw new Error("Funcionario não encontrado");
        Object.assign(obj, { nome, tipo, preco, quantidade });
        await obj.save();
        return await Refeicao.findByPk(id, { include: { all: true, nested: true } });
    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await Refeicao.findByPk(id);
        if (obj == null) throw new Error("Refeicao não encontrada");
        try {
            await obj.destroy();
        } catch (error) {
            throw new Error("Não foi possível deletar a Refeicao. Verifique se ela não está vinculado a outro registro.");
        }
    }
}

export { RefeicaoService } ;