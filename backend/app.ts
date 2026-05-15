import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

// Importar nuestras rutas
import meetingRoutes from './routes/meeting.routes';
import assignmentRoutes from './routes/assignment.routes';
import clientRoutes from './routes/client.routes';
import todoRoutes from './routes/todo.routes';
import serviceRoutes from './routes/service.routes';
import criticalServiceRoutes from './routes/criticalService.routes';

// Crear la instancia de la aplicación Express
const app: Application = express();

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Parsea los bodies de las peticiones a JSON

// Ruta de prueba para verificar que el servidor funciona
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', message: 'Backend is running!' });
});

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Usar las rutas de los módulos
app.use('/api/meetings', meetingRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/critical-services', criticalServiceRoutes);

// Exportar la app para usarla en index.ts
export default app;