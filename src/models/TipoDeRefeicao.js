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
          },
          async tipoUnicoPorValor(value) {
            const where = { tipo: value };
            if (this.id) {
              where.id = { [this.sequelize.Sequelize.Op.ne]: this.id };
            }

            const existe = await this.constructor.findOne({ where });
            if (existe) {
              throw new Error(`Já existe um Tipo de Refeição com o tipo ${value}.`);
            }
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
  }

}

export { TipoDeRefeicao };