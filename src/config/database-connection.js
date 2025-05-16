import Sequelize from 'sequelize';
import { databaseConfig } from "./database-config.js";

import { Bebida } from '../models/Bebida.js';
import { Bloco } from '../models/Bloco.js';
import { Campus } from '../models/Campus.js';
import { Cardapio } from '../models/Cardapio.js';
import { Cliente } from '../models/Cliente.js';
import { Entrega } from '../models/Entrega.js';
import { Entregador } from '../models/Entregador.js';
import { Funcionario } from '../models/Funcionario.js';
import { Pedido } from '../models/Pedido.js';
import { Refeicao } from '../models/Refeicao.js';

const sequelize = new Sequelize(databaseConfig);

Bebida.init(sequelize);
Bloco.init(sequelize);
Campus.init(sequelize);
Cardapio.init(sequelize);
Cliente.init(sequelize);
Entrega.init(sequelize);
Entregador.init(sequelize);
Funcionario.init(sequelize);
Pedido.init(sequelize);
Refeicao.init(sequelize);

Campus.associate(sequelize.models);
Bloco.associate(sequelize.models);
Bebida.associate(sequelize.models);
Cardapio.associate(sequelize.models);
Cliente.associate(sequelize.models);
Entrega.associate(sequelize.models);
Entregador.associate(sequelize.models);
Funcionario.associate(sequelize.models);
Pedido.associate(sequelize.models);
Refeicao.associate(sequelize.models);

databaseInserts();

function databaseInserts() {   
    sequelize.sync({ force: true }).then(async () => {
        const campus = await Campus.create({ nome: 'Campus Central', endereco: 'Rua Principal, 123', quantidadeBlocos: 2, status: true });
        const bloco = await Bloco.create({ nome: 'Bloco A', tipo: '0', capacidade: 100, descricao: 'Bloco de aulas', campusId: campus.id });
        const cliente = await Cliente.create({ nome: 'João Silva', cpf: '123.456.789-00', telefone: '(11)91234-5678', endereco: 'Rua Principal, 123', status: true });
        const funcionario = await Funcionario.create({ nome: 'Maria Oliveira', cpf: '987.654.321-00', cargo: 'Cozinheira', telefone: '(11)99876-5432', endereco: 'Rua Principal, 123', data_de_emissao: new Date(), campusId: campus.id });
        const entregador = await Entregador.create({ nome: 'Carlos Souza', cpf: '111.222.333-44', telefone: '(11)90000-0000', endereco: 'Rua Secundária, 456', cnh: '12345678900', veiculo: 'Moto', status: "ativo" });
        const bebida = await Bebida.create({ nome: 'Coca-Cola', tipo: '0', preco: 5.0, quantidade: 0 });
        const cardapio = await Cardapio.create({ data: new Date(), descricao: 'Cardápio do dia', campusId: campus.id });
        const refeicao = await Refeicao.create({ nome: 'Arroz com Feijão', descricao: 'Prato típico', tipo: '0', preco: 10.0, quantidade: 50 });
        const pedido = await Pedido.create({ cliente: cliente.id, cardapio: cardapio.id, refeicao: refeicao.id, bebida: bebida.id, dataHora: new Date(), campus: campus.id, bloco: bloco.id });
        await Entrega.create({ pedidoId: pedido.id, entregadorId: entregador.id, inicio_entrega: new Date(), fim_entrega: new Date() });
    });
}

export default sequelize;