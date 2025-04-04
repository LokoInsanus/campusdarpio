import { Model, DataTypes } from 'sequelize';

class Entrega extends Model {
    static init(sequelize) {
        super.init(
            {
                pedido: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'Pedido cannot be null' },
                        notEmpty: { msg: 'Pedido cannot be empty' },
                    },
                },
                entregador: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'Entregador cannot be null' },
                        notEmpty: { msg: 'Entregador cannot be empty' },
                    },
                },
                inicio_entrega: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'Inicio_entrega cannot be null' },
                        notEmpty: { msg: 'Inicio_entrega cannot be empty' },
                        isDate: { msg: 'Inicio_entrega must be a valid date' },
                    },
                },
                fim_entrega: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'Fim_entrega cannot be null' },
                        notEmpty: { msg: 'Fim_entrega cannot be empty' },
                        isDate: { msg: 'Fim_entrega must be a valid date' },
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