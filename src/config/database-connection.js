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
import { TipoDeRefeicao } from '../models/TipoDeRefeicao.js';

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
TipoDeRefeicao.init(sequelize);

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
TipoDeRefeicao.associate(sequelize.models);

// databaseInserts();

function databaseInserts() {
    (async () => {
        await sequelize.sync({ force: true });

        await Bebida.create({ nome: 'Coca-Cola', preco: 5.0 });
        await Bloco.create({ nome: 'Bloco A' });
        await Campus.create({ nome: 'Campus Central', endereco: 'Rua Principal, 123' });
        await Cardapio.create({ data: new Date(), descricao: 'Cardápio do dia' });
        await Cliente.create({ nome: 'João Silva', email: 'joao.silva@example.com', telefone: '123456789' });
        await Entrega.create({ endereco: 'Rua Secundária, 456', status: 'Pendente' });
        await Entregador.create({ nome: 'Carlos Souza', veiculo: 'Moto' });
        await Funcionario.create({ nome: 'Maria Oliveira', cargo: 'Cozinheira' });
        await Pedido.create({ clienteId: 1, total: 50.0, status: 'Em andamento' });
        await Refeicao.create({ nome: 'Arroz com Feijão', preco: 10.0 });
        await TipoDeRefeicao.create({ descricao: 'Vegetariana' });
    })
}

export default sequelize;