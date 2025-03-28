import {Model, DataTypes} from 'sequelize';

class Entregador extends Model {
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
            cnh: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            veiculo: DataTypes.STRING,
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
            modelName: 'Entregador',
            tableName: 'entregadors',
        });
    }

    static associate(models) {
        
    }
}

export { Entregador };