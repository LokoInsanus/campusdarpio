// export const databaseConfig = {
//   dialect: 'sqlite',
//   storage: 'database.sqlite',
//   define: {
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true
//   }
// };

export const databaseConfig = {
  dialect: 'postgres',
  host: 'dpg-d0sr89k9c44c73ff2p70-a.oregon-postgres.render.com',
  username: 'campusdarpio_user',
  password: '8hVzGJLuQjsmr9Pzaq8fgq5G8rVRC6fT',
  database: 'campusdarpio',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    timestamps: true,
    freezeTableName: true,
    underscored: true
  }
};

// export const databaseConfig = {
//   dialect: 'postgres',
//   host: 'postgresql://campusdarpio_user:8hVzGJLuQjsmr9Pzaq8fgq5G8rVRC6fT@dpg-d0sr89k9c44c73ff2p70-a/campusdarpio',
//   username: 'campusdarpio_user',
//   password: 'postgres',
//   database: 'campusdarpio',
//   define: {
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true
//   }
// };