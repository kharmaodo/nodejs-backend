const express = require('express');
const expressOasGenerator = require('express-oas-generator');
const app = express();

app.use(express.json());

const studentRoutes = require('./routes/student.routes');
const coursRoutes = require('./routes/cours.routes');
expressOasGenerator.init(app, {});
app.use('/api/students',studentRoutes);
app.use('/api/cours',coursRoutes);
//Lancer l'application avec un numero de port
let port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(`Demarrage au port ${port}! `);
})
