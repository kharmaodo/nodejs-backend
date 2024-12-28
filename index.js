const express = require('express');
const swaggerSpec = require('./swagger');
const expressOasGenerator = require('express-oas-generator');
const swaggerUi = require('swagger-ui-express');
const studentRoutes = require('./routes/student.routes');
const coursRoutes = require('./routes/cours.routes');
const app = express();

app.use(express.json());
// Exposer la spécification JSON Swagger
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
expressOasGenerator.init(app, {});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/students',studentRoutes);
app.use('/api/cours',coursRoutes);
//Lancer l'application avec un numero de port
let port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(`Demarrage au port ${port}! `);
    console.log(`Swagger disponible sur http://localhost:${port}/api-docs`);
})
