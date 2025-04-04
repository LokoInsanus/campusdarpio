import { Model, DataTypes } from 'sequelize';

class Pedido extends Model {
    static init(sequelize) {
        super.init(
            {
                pedidoId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                cliente: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                cardapio: {
                    type: DataTypes.INTEGER, // * Refeições e bebidas terão select baseado em cardapio. *
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                refeicao: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                bebida: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                dataHora: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                        isDate: true,
                    },
                },
                campus: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                bloco: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
            },
            {
                sequelize,
                modelName: 'Pedido',
                tableName: 'pedidos',
            }
        );
    }

    static associate(models) {
        models.Entrega.belongsTo(models.Pedido, {
            foreignKey: 'refeicaoId',
            as: 'refeicao',
        });
    }
}

export { Pedido };