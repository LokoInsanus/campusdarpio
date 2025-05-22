import { Model, DataTypes } from 'sequelize';

class Cardapio extends Model {
  static init(sequelize) {
    super.init({
      data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: { msg: "O campo 'data' não pode ser nulo!" },
          isDate: { msg: "O campo 'data' deve conter uma data válida!" }
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
    this.belongsToMany(models.Bebida, {
      as: 'bebidas',
      through: 'cardapio_bebida',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    this.belongsToMany(models.Refeicao, {
      as: 'refeicoes',
      through: 'cardapio_refeicao',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
}

export { Cardapio };
