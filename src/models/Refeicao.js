import { Model, DataTypes } from 'sequelize';
import { TipoDeRefeicao } from './TipoDeRefeicao.js';

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
        if (models.TipoDeRefeicao || TipoDeRefeicao) { // Verifica se o modelo TipoDeRefeicao está disponível
            this.belongsTo(models.TipoDeRefeicao || TipoDeRefeicao, {
                as: 'tipoderefeicao',
                foreignKey: {
                    name: 'tipoderefeicaoId',
                    allowNull: false,
                    validate: {
                        notNull: {
                            msg: 'O campo tipoDeRefeicaoId não pode ser nulo.',
                        },
                    },
                },
            });
        } else {
            console.warn('TipoDeRefeicao model is not defined.');
        }
    }
}

export { Refeicao };