import { Model, DataTypes } from 'sequelize';

class TipoDeRefeicao extends Model {

  static init(sequelize) {
    super.init({
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
    }, { 
      sequelize, 
      modelName: 'tipoderefeicao', 
      tableName: 'tiposderefeicoes'
    });
  }

  static associate(models) {
    this.hasMany(models.Refeicao, {
      foreignKey: 'tipoDeRefeicaoId',
      as: 'refeicoes'
    });
  }

}

export { TipoDeRefeicao };