import { Model, DataTypes } from 'sequelize';

class Cliente extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            cargo: DataTypes.STRING,
            telefone: DataTypes.STRING,
            endereco: DataTypes.STRING,
            status: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Cliente',
            tableName: 'clientes',
        });
    }

    static associate(models) {

    }
}

export { Cliente };