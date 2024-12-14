const express = require('express');
const {v4:uuidv4} =require('uuid');
const bodyParser = require('body-parser');

const app = express();

// Fake Database
const students =[
{
    "id":uuidv4(),
    "nom":"Thiam",
    "prenom":"Serigne Modou",
    "email":"grandthiame@gmail.com",
    "telephone":"77440560",
},
{
    "id":uuidv4(),
    "nom":"Coly",
    "prenom":"Malick",
    "email":"malickcoly342@gmail.com",
    "telephone":"784059330",
},
{
    "id":uuidv4(),
    "nom":"TINE",
    "prenom":"Abdoussalam",
    "email":"abdoussalamtine4@gmail.com",
    "telephone":"785457598",
},
];



app.get('/',(req,res) => {
    res.json(students);
});

app.get('/:id',(req,res) => {
const id = req.params.id;
const currentStudent = students.find(student=>student.id===id);
res.json(currentStudent);
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