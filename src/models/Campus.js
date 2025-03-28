import { Model, DataTypes } from 'sequelize';

class Campus extends Model {
    static init(sequelize) {
        super.init({
            campusId: DataTypes.INTEGER,
            nome: DataTypes.STRING,
            endereco: DataTypes.STRING,
            quantidadeBlocos: DataTypes.STRING,
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

