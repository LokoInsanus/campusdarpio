import {Model, DataTypes} from 'sequelize';

class Entrega extends Model {
    static init(sequelize) {
        super.init({
            pedidoId: DataTypes.INTEGER,
            entregadorId: DataTypes.INTEGER,
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