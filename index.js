const express = require('express');

const app = express();

app.use(express.json());

const studentRoutes = require('./routes/student.routes');
const coursRoutes = require('./routes/cours.routes');

app.use('/api/students',studentRoutes);
app.use('/api/cours',coursRoutes);
//Lancer l'application avec un numero de port
let port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(`Demarrage au port ${port}! `);
})
