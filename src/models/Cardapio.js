import { Model, DataTypes } from 'sequelize';

class Cardapio extends Model {
    static init(sequelize) {
        super.init({
            data: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: { msg: "O campo 'data' não pode ser nulo!" },
                    notEmpty: { msg: "O campo 'data' não pode estar vazio!" }
                }
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "O campo 'descricao' não pode ser nulo!" },
                    notEmpty: { msg: "O campo 'descricao' não pode estar vazio!" }
                }
            }
        }, {
            sequelize,
            modelName: 'Cardapio',
            tableName: 'cardapios'
        });
    }

    static associate(models) {
        // Defina as associações aqui, se necessário
    }
}

export { Cardapio };