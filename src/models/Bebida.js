import { Model, DataTypes } from 'sequelize';

class Bebida extends Model {

  static init(sequelize) {
    super.init({
      nome: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Nome da Bebida deve ser preenchido!" },
          len: { args: [2, 50], msg: "Nome do Bebida deve ter entre 2 e 50 letras!" }
        }
      },
      tipo: {
        type: DataTypes.ENUM ("0", "1", "2", "3"),
        defaultvalue: "0",
        validate: {
          isIn: {
            args: [["0", "1", "2", "3"]], // "0" para Refrigerante // "1" para Suco natural // "2" para Chá // "3" para Café
            msg: "Tipo da Bebida deve ser 0, 1, 2 ou 3!"
          }
        }
      },
      preco: {
        type: DataTypes.DOUBLE,
        validate: {
          isFloat: { msg: "O preço da bebida deve ser preenchido com um valor decimal!" }
        }
      },
      quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
          zero(value) {
            if (this.isNewRecord && value !== 0) {
              throw new Error("A quantidade deve ser 0 no momento do cadastro!");
            }
          }
        }
      }
    }, { sequelize, modelName: 'Bebida', tableName: 'bebidas' })
  }

  static associate(models) {
  }

}

export { Bebida };