import { Model, DataTypes } from 'sequelize';

class Entrega extends Model {
    static init(sequelize) {
        super.init(
            {
                pedidoId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'Pedido não pode ser nulo' },
                        notEmpty: { msg: 'Pedido não pode ser vazio' },
                    },
                },
                entregadorId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'Entregador não pode ser nulo' },
                        notEmpty: { msg: 'Entregador não pode ser vazio' },
                    },
                },
                inicio_entrega: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'Início da entrega não pode ser nulo' },
                        notEmpty: { msg: 'Início da entrega não pode ser vazio' },
                        isDate: { msg: 'Início da entrega deve ser uma data válida' },
                    },
                },
                fim_entrega: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'Fim da entrega não pode ser nulo' },
                        notEmpty: { msg: 'Fim da entrega não pode ser vazio' },
                        isDate: { msg: 'Fim da entrega deve ser uma data válida' },
                    },
                },
            },
            {
                sequelize,
                modelName: 'Entrega',
                tableName: 'entregas',
            }
        );
    }

    static associate(models) {
        models.Entrega.belongsTo(models.Pedido, {
            foreignKey: 'pedidoId',
            as: 'pedidoDetails',
        });

        models.Entrega.belongsTo(models.Entregador, {
            foreignKey: 'entregadorId',
            as: 'entregadorDetails',
        });
    }
}

export { Entrega };