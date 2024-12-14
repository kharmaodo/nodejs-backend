const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/',(req,res) => {
    res.send('GET en cours de mise en oeuvre');
});

app.get('/:id',(req,res) => {
const id = req.params.id;
    res.send(`GET en cours de mise en oeuvre de la ressource ${id}`);
});

app.post('/',(req,res) => {
    res.send('POST en cours de mise en oeuvre');
});

app.put('/:id',(req,res) => {
    const id = req.params.id;
    res.json(`PUT en cours de mise en oeuvre de la ressource ${id}`);
});

app.delete('/:id',(req,res) => {
    const id = req.params.id;
   res.json(`DELETE en cours de mise en oeuvre de la ressource ${id}`);
});

//Lancer l'application avec un numero de port
let port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(`Demarrage au port ${port}! `);
})