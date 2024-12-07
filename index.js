const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/',(req,res) => {
    res.send('Hello Bambey Master');
});

//Lancer l'application avec un numero de port
let port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(`Demarrage au port ${port}! `);
})