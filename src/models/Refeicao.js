import { Model, DataTypes } from 'sequelize';

class Refeicao extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'O campo nome não pode estar vazio.',
                    },
                },
            },
            tipo: { //Acertar FK TIPO
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'O campo tipo não pode estar vazio.',
                    },
                },
            },
            preco: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: {
                        msg: 'O campo preço deve ser um número válido.',
                    },
                    min: {
                        args: [0],
                        msg: 'O preço deve ser maior ou igual a 0.',
                    },
                },
            },
            quantidade: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: {
                        msg: 'O campo quantidade deve ser um número inteiro.',
                    },
                    min: {
                        args: [0],
                        msg: 'A quantidade deve ser maior ou igual a 0.',
                    },
                },
            },
        }, {
            sequelize,
            modelName: 'Refeicao',
            tableName: 'refeicoes',
        });
    }

    static associate(models) {
        if (models.TipoDeRefeicao) {
            this.belongsTo(models.TipoDeRefeicao, {
                foreignKey: 'tipoDeRefeicaoId',
                as: 'tipoDeRefeicao',
            });
        } else {
            console.warn('TipoDeRefeicao model is not defined.');
        }
    }
}

export { Refeicao };