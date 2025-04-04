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
            endereco: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'O endereço não pode ser nulo' },
                notEmpty: { msg: 'O endereço não pode estar vazio' },
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
            status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {
                notNull: { msg: 'O status não pode ser nulo' },
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