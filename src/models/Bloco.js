import { Model, DataTypes } from 'sequelize';

class Bloco extends Model {

  static init(sequelize) {
    super.init({
      nome: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Nome do Bloco deve ser preenchido!" },
          len: { args: [2, 50], msg: "Nome do Bloco deve ter entre 2 e 50 letras!" }
        }
      },
      tipo: {
        type: DataTypes.ENUM("0", "1", "2", "3"),
        defaultvalue: "0",
        validate: {
          isIn: {
            args: [["0", "1", "2", "3"]], // "0" para Bloco de Aulas // "1" para Bloco Administrativo // "2" para Bloco de Laboratório // "3" para Bloco da Incubadora
            msg: "Tipo do Bloco deve ser 0, 1, 2 ou 3!"
          }
        }
      },
      capacidade: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: "A quantidade de alunos do bloco deve ser preenchida em inteiro!" }
        }
      },
      descricao: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "A descrição deve ser preenchida!" },
          len: { args: [2, 100], msg: "A descrição deve ter entre 2 e 100 letras!" }
        }
      },
    }, { sequelize, modelName: 'bloco', tableName: 'blocos' })
  }

  static associate(models) {
    this.belongsTo(models.campus, { as: 'campus', foreignKey: { name: 'campusId', allowNull: false, validate: { notNull: { msg: 'Campus do Bloco deve ser preenchida!' } } } });
  }

}

export { Bloco };