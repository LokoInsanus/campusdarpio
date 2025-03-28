import {Model, DataTypes} from 'sequelize';

class Funcionario extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            cpf: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
                is: /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/,
            },
            cargo: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            telefone: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
                is: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
            },
            endereco: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            data_de_emissao: DataTypes.DATE,
            validate: {
                notNull: true,
                notEmpty: true,
            },
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