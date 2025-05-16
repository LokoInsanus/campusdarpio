import { Model, DataTypes } from 'sequelize';

class Cardapio extends Model {
  static init(sequelize) {
    super.init({
      data: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "O campo 'data' não pode ser nulo!" },
          notEmpty: { msg: "O campo 'data' não pode estar vazio!" }
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
      // foreignKey: {
      //   name: 'bebidaId',
      //   allowNull: false,
      //   validate: {
      //     notNull: { msg: 'Bebida(s) do Cardápio deve(m) ser preeenchida(s)!' }
      //   }
      // }, 
      through: 'cardapio_bebida', onDelete: 'CASCADE', onUpdate: 'CASCADE'
    });
    this.belongsToMany(models.Refeicao, {
      as: 'refeicoes', 
      // foreignKey: {
      //   name: 'refeicaoId',
      //   allowNull: false,
      //   validate: {
      //     notNull: { msg: 'Refeição(ões) do Cardápio deve(m) ser preeenchida(s)!' }
      //   }
      // }, 
      through: 'cardapio_refeicao', onDelete: 'CASCADE', onUpdate: 'CASCADE'
    });
  }
}

export { Cardapio };