const express = require('express');
const {v4:uuidv4} =require('uuid');

const app = express();

app.use(express.json());

// Fake Database
const students = [
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


const cours =[
    {
        "id":uuidv4(),
        "cours":"Developpement Web",
        "duration":"36h",
    },
    {
        "id":uuidv4(),
        "cours":"Machine Learning",
        "duration":"30h",
    },
    {
        "id":uuidv4(),
        "cours":"Big Data",
        "duration":"36h",
    },
    ];


app.get('/students',(req,res) => {
    res.json(students);
});

app.get('/students/:id',(req,res) => {
const id = req.params.id;
const currentStudent = students.find(student=>student.id===id);
res.json(currentStudent);
});

function createStudent(studentToBeCreated){
    studentToBeCreated.id = uuidv4();
    students.push(studentToBeCreated);
    return studentToBeCreated ;
}
    
app.post('/students',(req,res) => {
    //Recuperation de la réquete émise par le client
const createdStudent = createStudent(req.body)
    res.status(201).json({
        message: `Etudiant(e) crée(e) avec un nouveau id :  ${createdStudent.id} `
    })
});

app.put('/students/:id',(req,res) => {
    const id = req.params.id;
    res.json(`PUT en cours de mise en oeuvre de la ressource ${id}`);
});

app.delete('/students/:id',(req,res) => {
    const id = req.params.id;
   res.json(`DELETE en cours de mise en oeuvre de la ressource ${id}`);
});


//Homework

app.get('/cours',(req,res) => {
    res.json(cours);
});

app.get('/cours/:id',(req,res) => {
const id = req.params.id;
const currentCours = cours.find(cours=>cours.id===id);
res.json(currentCours);
});

//Lancer l'application avec un numero de port
let port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(`Demarrage au port ${port}! `);
})