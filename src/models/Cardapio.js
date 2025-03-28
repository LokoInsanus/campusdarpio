import { Model, DataTypes } from 'sequelize';

class Cardapio extends Model {

  static init(sequelize) {
    super.init({
      data: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          // a data deve ser automaticamente preenchida a do dia.
        }
      },
      // tem que fazer refeicao e bebida virar uma lista.
      refeicao: DataTypes.INTEGER,
      validate: {
        notNull: true,
        notEmpty: true,
      },
      bebida: DataTypes.INTEGER,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    }, { sequelize, modelName: "cardapio", tableName: "cardapios" });
  }

  static associate(models) {

  }
}

export { Cardapio };