const swaggerJSDoc = require('swagger-jsdoc');
let port = process.env.PORT || 4000;
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Backend for producing Restful API (cours and students)',
    version: '1.0.0',
    description: `<a target="_blank" href="http://localhost:${port}/swagger.json">Documentation</a><br> Produces a Restfull API for course and students Written by Maodo DIOP for academic purpose`,
  },
  servers: [
    {
      url: `http://localhost:${port}/api`,
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
