import { Model, DataTypes } from 'sequelize';

class Campus extends Model {
    static init(sequelize) {
        super.init({
            nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            }
            },
            endereco: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            }
            },
            quantidadeBlocos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            }
            },
            status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            }
            }
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

