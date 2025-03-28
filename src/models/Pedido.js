import { Model, DataTypes } from 'sequelize';

class Pedido extends Model {
    
    static init(sequelize) {
        super.init({ 
            pedidoId: DataTypes.INTEGER,
            cliente: DataTypes.INTEGER,
            cardapio: DataTypes.INTEGER, // * Refeições e bebidas terão select baseado em cardapio. *
            refeicao: DataTypes.INTEGER,
            bebida: DataTypes.INTEGER,
            dataHora: DataTypes.DATE,
            campus: DataType.INTEGER,
            bloco: DataType.INTEGER
        },{
            sequelize,
            modelName: 'Pedido',
            tableName: 'pedidos',
        });
    }

    static associate(models) {

    }
}

export { Pedido };