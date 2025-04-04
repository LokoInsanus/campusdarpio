import { Model, DataTypes } from 'sequelize';

class Cliente extends Model {
    static init(sequelize) {
        super.init({
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
            cargo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'O cargo não pode ser nulo' },
                notEmpty: { msg: 'O cargo não pode estar vazio' },
            },
            },
            telefone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'O telefone não pode ser nulo' },
                notEmpty: { msg: 'O telefone não pode estar vazio' },
                is: {
                args: /^[0-9]{10,11}$/,
                msg: 'O telefone deve conter 10 ou 11 dígitos numéricos',
                },
            },
            },
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