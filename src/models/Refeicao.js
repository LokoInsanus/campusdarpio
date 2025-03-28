import { Model, DataTypes } from 'sequelize';

class Refeicao extends Model {
    static init(sequelize) {
        super.init({
            refeicaoId: DataTypes.INTEGER,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            nome: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            tipo: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            preco: DataTypes.FLOAT,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            quantidade: DataTypes.INTEGER,
            validate: {
                notNull: true,
                notEmpty: true,
            },
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