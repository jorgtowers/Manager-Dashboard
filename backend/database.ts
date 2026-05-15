import { Sequelize } from 'sequelize';
import path from 'path';

// Creamos una instancia de Sequelize y configuramos la conexión a SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  // La base de datos se guardará en un archivo dentro de la carpeta 'data'
  storage: path.join(__dirname, '../data/dev.sqlite'),
  logging: console.log, // Muestra las consultas SQL en la consola. Cambiar a `false` para producción.
});

export const connectDB = async () => {
  await sequelize.authenticate();
  console.log('Database connection has been established successfully.');
};

export default sequelize;