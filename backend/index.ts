// Corregida la ruta de importación de app
import app from './app';
import sequelize, { connectDB } from './database'; // Asumiendo que database.ts está en el mismo nivel que index.ts
import { seedDatabase } from './seed';

const PORT = process.env.PORT || 3001;

const main = async () => {
  try {
    // 1. Conectar a la base de datos
    await connectDB();

    // 2. Sincronizar los modelos con la base de datos
    // El { force: true } borraría y recrearía las tablas. Usar con cuidado.
    // Lo quitaremos después de la fase inicial de desarrollo.
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');
    
    // 3. Poblar la base de datos con datos iniciales si está vacía
    await seedDatabase();

    // 4. Iniciar el servidor Express
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
};

main();