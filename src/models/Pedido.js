import { Model, DataTypes } from 'sequelize';

class Pedido extends Model {
    static init(sequelize) {
        super.init(
            {
                clienteId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                cardapioId: {
                    type: DataTypes.INTEGER, // * Refeições e bebidas terão select baseado em cardapio. *
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                refeicaoId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                bebidaId: {
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
                campusId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                blocoId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: 'aberto',
                    validate: {
                        notNull: true,
                        notEmpty: true,
                        isIn: [['aberto', 'finalizado']],
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