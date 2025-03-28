import { Model, DataTypes } from 'sequelize';

class Campus extends Model {
    static init(sequelize) {
        super.init({
            campusId: DataTypes.INTEGER,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            nome: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            endereco: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            quantidadeBlocos: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
            },
            status: DataType.BOOLEAN
        }, {
            sequelize,
            modelName: 'Campus',
            tableName: 'campi'
        });
    }

    static associate(models) {

    }
}

export { Campus }

