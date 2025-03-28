import {Model, DataTypes} from 'sequelize';

class Entrega extends Model {
    static init(sequelize) {
        super.init({
            pedidoId: DataTypes.INTEGER,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            entregadorId: DataTypes.INTEGER,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            inicio_entrega: DataTypes.DATE,
            validate: {
                notNull: true,
                notEmpty: true,
                isDate: true,
            },
            fim_entrega: DataTypes.DATE,
            validate: {
                notNull: true,
                notEmpty: true,
                isDate: true,
            },
        }, {
            sequelize,
            modelName: 'Entrega',
            tableName: 'entregas',
        });
    }

    static associate(models) {
        models.Entrega.belongsTo(models.Pedido, {
            foreignKey: 'pedidoId',
            as: 'pedido',
        });

        models.Entrega.belongsTo(models.Entregador, {
            foreignKey: 'entregadorId',
            as: 'entregador',
        });
      }
}

export { Entrega };