import {Model, DataTypes} from 'sequelize';

class Entregador extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            cargo: DataTypes.STRING,
            telefone: DataTypes.STRING,
            endereco: DataTypes.STRING,
            cnh: DataTypes.STRING,
            veiculo: DataTypes.STRING,
            status: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Entregador',
            tableName: 'entregadors',
        });
    }

    static associate(models) {
        
    }
}

export { Entregador };