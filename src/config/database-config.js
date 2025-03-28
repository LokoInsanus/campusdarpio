export const databaseConfig = {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true
    }
  };