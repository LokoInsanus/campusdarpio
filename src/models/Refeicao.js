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
      descricao: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: 'O campo descrição não pode estar vazio.',
          },
        },
      },
      tipo: {
        type: DataTypes.ENUM("0", "1", "2", "3", "4", "5"),
        defaultValue: "0",
        validate: {
          isIn: {
            args: [["0", "1", "2", "3", "4", "5"]],
            msg: "Tipo da Refeição deve ser 0, 1, 2, 3, 4 ou 5!"
          }
        }
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
  }
}

export { Refeicao };