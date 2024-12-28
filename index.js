const express = require('express');
const expressOasGenerator = require('express-oas-generator');
const swaggerConfig = require('./docs/swagger_config');
const studentRoutes = require('./routes/student.routes');
const coursRoutes = require('./routes/cours.routes');
const app = express();

app.use(express.json());
expressOasGenerator.handleResponses(app,swaggerConfig);
app.use('/api/students',studentRoutes);
app.use('/api/cours',coursRoutes);
expressOasGenerator.handleRequests();
//Lancer l'application avec un numero de port
let port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(`Demarrage au port ${port}! `);
    console.log(`Swagger disponible sur http://localhost:${port}/api-docs`);
})
