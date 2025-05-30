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

        const campus1 = await Campus.create({ nome: 'Campus Central', endereco: 'Rua Principal, 123', quantidadeBlocos: 2, status: true });
        const campus2 = await Campus.create({ nome: 'Campus Norte', endereco: 'Rua Norte, 456', quantidadeBlocos: 3, status: true });
        const campus3 = await Campus.create({ nome: 'Campus Sul', endereco: 'Rua Sul, 789', quantidadeBlocos: 1, status: false });
        const campus4 = await Campus.create({ nome: 'Campus Leste', endereco: 'Rua Leste, 321', quantidadeBlocos: 4, status: true });

        const bloco1 = await Bloco.create({ nome: 'Bloco A', tipo: '0', capacidade: 100, descricao: 'Bloco de aulas', campusId: campus1.id });
        const bloco2 = await Bloco.create({ nome: 'Bloco B', tipo: '1', capacidade: 80, descricao: 'Bloco administrativo', campusId: campus2.id });
        const bloco3 = await Bloco.create({ nome: 'Bloco C', tipo: '0', capacidade: 120, descricao: 'Bloco de laboratórios', campusId: campus3.id });
        const bloco4 = await Bloco.create({ nome: 'Bloco D', tipo: '1', capacidade: 90, descricao: 'Bloco de esportes', campusId: campus4.id });

        const cliente1 = await Cliente.create({ nome: 'João Silva', cpf: '123.456.789-00', telefone: '(11)91234-5678', endereco: 'Rua Principal, 123', status: 'disponível' });
        const cliente2 = await Cliente.create({ nome: 'Ana Souza', cpf: '234.567.890-11', telefone: '(11)92345-6789', endereco: 'Rua Norte, 456', status: 'disponível' });
        const cliente3 = await Cliente.create({ nome: 'Pedro Lima', cpf: '345.678.901-22', telefone: '(11)93456-7890', endereco: 'Rua Sul, 789', status: 'disponível' });
        const cliente4 = await Cliente.create({ nome: 'Mariana Costa', cpf: '456.789.012-33', telefone: '(11)94567-8901', endereco: 'Rua Leste, 321', status: 'bloqueado' });

        const funcionario1 = await Funcionario.create({ nome: 'Maria Oliveira', cpf: '987.654.321-00', cargo: 'Cozinheira', telefone: '(11)99876-5432', endereco: 'Rua Principal, 123', data_de_emissao: new Date(), campusId: campus1.id });
        const funcionario2 = await Funcionario.create({ nome: 'Carlos Pereira', cpf: '876.543.210-11', cargo: 'Auxiliar', telefone: '(11)98765-4321', endereco: 'Rua Norte, 456', data_de_emissao: new Date(), campusId: campus2.id });
        const funcionario3 = await Funcionario.create({ nome: 'Fernanda Lima', cpf: '765.432.109-22', cargo: 'Gerente', telefone: '(11)97654-3210', endereco: 'Rua Sul, 789', data_de_emissao: new Date(), campusId: campus3.id });
        const funcionario4 = await Funcionario.create({ nome: 'Lucas Rocha', cpf: '654.321.098-33', cargo: 'Limpeza', telefone: '(11)96543-2109', endereco: 'Rua Leste, 321', data_de_emissao: new Date(), campusId: campus4.id });

        const entregador1 = await Entregador.create({ nome: 'Carlos Souza', cpf: '111.222.333-44', telefone: '(11)90000-0000', endereco: 'Rua Secundária, 456', cnh: '12345678900', veiculo: 'Moto', status: "ativo" });
        const entregador2 = await Entregador.create({ nome: 'Paula Mendes', cpf: '222.333.444-55', telefone: '(11)91111-1111', endereco: 'Rua Norte, 456', cnh: '23456789011', veiculo: 'Carro', status: "ativo" });
        const entregador3 = await Entregador.create({ nome: 'Rafael Dias', cpf: '333.444.555-66', telefone: '(11)92222-2222', endereco: 'Rua Sul, 789', cnh: '34567890122', veiculo: 'Bicicleta', status: "inativo" });
        const entregador4 = await Entregador.create({ nome: 'Juliana Alves', cpf: '444.555.666-77', telefone: '(11)93333-3333', endereco: 'Rua Leste, 321', cnh: '45678901233', veiculo: 'Moto', status: "ativo" });

        const bebida1 = await Bebida.create({ nome: 'Coca-Cola', tipo: '0', preco: 5.0, quantidade: 0 });
        const bebida2 = await Bebida.create({ nome: 'Suco de Laranja', tipo: '1', preco: 4.0, quantidade: 0 });
        const bebida3 = await Bebida.create({ nome: 'Água', tipo: '2', preco: 2.5, quantidade: 0 });
        const bebida4 = await Bebida.create({ nome: 'Guaraná', tipo: '0', preco: 5.5, quantidade: 0 });
        const bebida5 = await Bebida.create({ nome: 'Chá Gelado', tipo: '2', preco: 3.5, quantidade: 0 });
        const bebida6 = await Bebida.create({ nome: 'Café Preto', tipo: '3', preco: 2.0, quantidade: 0 });


        const refeicao1 = await Refeicao.create({ nome: 'Arroz com Feijão', descricao: 'Prato típico', tipo: '0', preco: 10.0, quantidade: 50 });
        const refeicao2 = await Refeicao.create({ nome: 'Macarronada', descricao: 'Macarrão ao molho', tipo: '1', preco: 12.0, quantidade: 40 });
        const refeicao3 = await Refeicao.create({ nome: 'Salada', descricao: 'Salada verde', tipo: '2', preco: 8.0, quantidade: 30 });
        const refeicao4 = await Refeicao.create({ nome: 'Frango Grelhado', descricao: 'Frango com legumes', tipo: '0', preco: 15.0, quantidade: 25 });
        const refeicao5 = await Refeicao.create({ nome: 'Lasanha', descricao: 'Lasanha à bolonhesa', tipo: '1', preco: 18.0, quantidade: 20 });
        const refeicao6 = await Refeicao.create({ nome: 'Sopa de Legumes', descricao: 'Sopa leve e nutritiva', tipo: '4', preco: 9.0, quantidade: 35 });

        const cardapio1 = await Cardapio.create({ data: new Date("2025-05-20"), descricao: 'Cardápio do semana 1' });
        await cardapio1.addBebidas([bebida1, bebida2, bebida3]);
        await cardapio1.addRefeicoes([refeicao1, refeicao2, refeicao3]);

        const cardapio2 = await Cardapio.create({ data: new Date("2025-05-30"), descricao: 'Cardápio do semana RN1' });
        await cardapio2.addBebidas([bebida1, bebida2]);
        await cardapio2.addRefeicoes([refeicao1, refeicao2]);

        const cardapio3 = await Cardapio.create({ data: new Date("2025-08-03"), descricao: "Cardápio 3" });
        await cardapio3.addBebidas([bebida1, bebida2]);
        await cardapio3.addRefeicoes([refeicao1, refeicao2]);

        const cardapio4 = await Cardapio.create({ data: new Date("2025-08-09"), descricao: "Cardápio 4" });
        await cardapio4.addBebidas([bebida5, bebida6]);
        await cardapio4.addRefeicoes([refeicao5, refeicao6]);

        const pedido1 = await Pedido.create({ clienteId: cliente1.id, cardapioId: cardapio1.id, refeicaoId: refeicao1.id, bebidaId: bebida1.id, dataHora: new Date(), campusId: campus1.id, blocoId: bloco1.id });
        const pedido2 = await Pedido.create({ clienteId: cliente2.id, cardapioId: cardapio2.id, refeicaoId: refeicao2.id, bebidaId: bebida2.id, dataHora: new Date(), campusId: campus2.id, blocoId: bloco2.id });
        const pedido3 = await Pedido.create({ clienteId: cliente3.id, cardapioId: cardapio3.id, refeicaoId: refeicao3.id, bebidaId: bebida3.id, dataHora: new Date(), campusId: campus3.id, blocoId: bloco3.id });
        const pedido4 = await Pedido.create({ clienteId: cliente4.id, cardapioId: cardapio4.id, refeicaoId: refeicao4.id, bebidaId: bebida4.id, dataHora: new Date(), campusId: campus4.id, blocoId: bloco4.id });
        const pedido5 = await Pedido.create({ clienteId: cliente1.id, cardapioId: cardapio1.id, refeicaoId: refeicao1.id, bebidaId: bebida1.id, dataHora: new Date(), campusId: campus1.id, blocoId: bloco1.id });

        const entrega1 = await Entrega.create({ pedidoId: pedido1.id, entregadorId: entregador1.id, inicio_entrega: new Date(), fim_entrega: new Date() });
        const entrega2 = await Entrega.create({ pedidoId: pedido2.id, entregadorId: entregador2.id, inicio_entrega: new Date(), fim_entrega: new Date() });
        const entrega3 = await Entrega.create({ pedidoId: pedido3.id, entregadorId: entregador3.id, inicio_entrega: new Date(), fim_entrega: new Date() });
        const entrega4 = await Entrega.create({ pedidoId: pedido4.id, entregadorId: entregador4.id, inicio_entrega: new Date(), fim_entrega: new Date() });
    });
}

export default sequelize;