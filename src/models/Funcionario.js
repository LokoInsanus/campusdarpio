import { Model, DataTypes } from 'sequelize';

class Funcionario extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: true,
                    },
                },
                cpf: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: true,
                        is: /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/,
                    },
                },
                cargo: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: true,
                    },
                },
                telefone: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: true,
                        is: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
                    },
                },
                endereco: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: true,
                    },
                },
                data_de_emissao: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    validate: {
                        notEmpty: true,
                    },
                },
            },
            {
                sequelize,
                modelName: 'Funcionario',
                tableName: 'funcionarios',
            }
        );
    }

    static associate(models) {
        // Define associations here if needed
    }
}

export { Funcionario };