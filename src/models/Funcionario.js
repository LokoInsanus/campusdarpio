import {Model, DataTypes} from 'sequelize';

class Funcionario extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            cargo: DataTypes.STRING,
            telefone: DataTypes.STRING,
            endereco: DataTypes.STRING,
            data_de_emissao: DataTypes.DATE,
        }, {
            sequelize,
            modelName: 'Funcionario',
            tableName: 'funcionarios',
        });
    }

    static associate(models) {
        
    }
}

export { Funcionario };