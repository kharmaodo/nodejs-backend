const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/',(req,res) => {
    res.send('Hello Bambey Master');
});

//Lancer l'application avec un numero de port
console.log("Demarrage ! ");
app.listen(process.env.PORT|| 3000);