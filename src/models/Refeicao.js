import { Model, DataTypes } from 'sequelize';

class Refeicao extends Model {
    static init(sequelize) {
        super.init({
            refeicaoId: DataTypes.INTEGER,
            nome: DataTypes.STRING,
            tipo: DataTypes.STRING,
            preco: DataTypes.FLOAT,
            quantidade: DataTypes.INTEGER
        },{
            sequelize,
            modelName: 'Refeicao',
            tableName: 'refeicoes',
        });
    }

    static associate(models){
        models.Refeicao.belongsTo(models.TipoDeRefeicao, {
            foreignKey: 'tipoDeRefeicaoId',
            as: 'tipo'
        })
    }
}

export { Refeicao }