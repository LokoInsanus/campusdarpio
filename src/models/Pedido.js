import { Model, DataTypes } from 'sequelize';

class Pedido extends Model {
    
    static init(sequelize) {
        super.init({ 
            pedidoId: DataTypes.INTEGER,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            cliente: DataTypes.INTEGER,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            cardapio: DataTypes.INTEGER, // * Refeições e bebidas terão select baseado em cardapio. *
            validate: {
                notNull: true,
                notEmpty: true,
            },
            refeicao: DataTypes.INTEGER,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            bebida: DataTypes.INTEGER,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            dataHora: DataTypes.DATE,
            validate: {
                notNull: true,
                notEmpty: true,
                isDate: true,
            },
            campus: DataType.INTEGER,
            bloco: DataType.INTEGER
        },{
            sequelize,
            modelName: 'Pedido',
            tableName: 'pedidos',
        });
    }

    static associate(models) {
        models.Entrega.belongsTo(models.Pedido, {
            foreignKey: 'refeicaoId',
            as: 'refeicao',
        });
      }
}

export { Pedido };