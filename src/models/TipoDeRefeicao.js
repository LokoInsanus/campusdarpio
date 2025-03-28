import { Model, DataTypes } from 'sequelize';

class TipoDeRefeicao extends Model {

  static init(sequelize) {
    super.init({
      tipo: {
        type: DataTypes.ENUM("0", "1", "2", "3", "4", "5"),
        defaultvalue: "0",
        validate: {
          isIn: {
            args: [["0", "1", "2", "3"]], // "0" para Carnívora, // "1" para Vegana, // "2" para Vegetariana, // "3" para Sem Glúten, // "4" para Sem Lactose, // "5" para Diabética.
            msg: "Tipo da Refeção deve ser 0, 1, 2, 3, 4 ou 5!"
          }
        }
      },
    }, { sequelize, modelName: 'tipoderefeicao', tableName: 'tiposderefeicoes' })
  }

  static associate(models) {
  }

}

export { TipoDeRefeicao };