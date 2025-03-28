import { Model, DataTypes } from 'sequelize';

class Cliente extends Model {
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
            status: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
                isIn: [['ativo', 'inativo']],
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