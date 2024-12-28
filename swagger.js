const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API UADB Documentation',
    version: '1.0.0',
    description: '<a target="_blank" href="http://localhost:3000/swagger.json">Documentation</a><br> documentation des API pour cours et etudiants de UADB',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Serveur local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
