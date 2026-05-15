import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TechManager API',
      version: '1.0.0',
      description: 'Documentación de la API para el backend de TechManager',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de Desarrollo'
      },
    ],
  },
  // La ruta a los archivos que contienen las anotaciones de la API
  apis: ['./routes/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;