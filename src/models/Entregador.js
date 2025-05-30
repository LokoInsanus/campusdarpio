import { Model, DataTypes } from 'sequelize';

class Entregador extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'O nome não pode ser nulo' },
                        notEmpty: { msg: 'O nome não pode estar vazio' },
                    },
                },
                cpf: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'O CPF não pode ser nulo' },
                        notEmpty: { msg: 'O CPF não pode estar vazio' },
                        is: {
                            args: /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/,
                            msg: 'O CPF deve estar no formato válido',
                        },
                    },
                },
                telefone: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'O telefone não pode ser nulo' },
                        notEmpty: { msg: 'O telefone não pode estar vazio' },
                        is: {
                            args: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
                            msg: 'O telefone deve estar no formato válido',
                        },
                    },
                },
                endereco: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'O endereço não pode ser nulo' },
                        notEmpty: { msg: 'O endereço não pode estar vazio' },
                    },
                },
                cnh: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'A CNH não pode ser nula' },
                        notEmpty: { msg: 'A CNH não pode estar vazia' },
                    },
                },
                veiculo: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'O veículo não pode ser nulo' },
                        notEmpty: { msg: 'O veículo não pode estar vazio' },
                    },
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: { msg: 'O status não pode ser nulo' },
                        notEmpty: { msg: 'O status não pode estar vazio' },
                        isIn: {
                            args: [['ativo', 'inativo']],
                            msg: 'O status deve ser "ativo" ou "inativo"',
                        },
                    },
                },
            },
            {
                sequelize,
                modelName: 'Entregador',
                tableName: 'entregadores',
            }
        );
    }

    static associate(models) {
        // Defina as associações aqui, se necessário
    }
}

export { Entregador };