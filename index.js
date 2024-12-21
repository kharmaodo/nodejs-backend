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

function updateStudent(id,studentToBeUpdated){
    const index = students.findIndex(student=>student.id===id);
    if(index!==-1){
        students[index]={...students[index],
            ...studentToBeUpdated
        }

        return students[index];
    }

    return null ;
}


function deleteStudent(id,studentToBeDeleted){
    const index = students.findIndex(student=>student.id===id);
    if(index!==-1){
        students.splice(index,1);
        return  true;
    }

    return false ;
}

app.put('/students/:id',(req,res) => {
    const id = req.params.id;
const studentToBeUpdated = updateStudent(id,req.body);
if(studentToBeUpdated){
    res.status(201).json(`Informations modifiées pour l'etudiant(e)  avec id :  ${studentToBeUpdated.id}`);
}else {
    res.status(404).json({
        message: `Etudiant(e) avec id ${id} non trouvé`
    })
}
});

app.delete('/students/:id',(req,res) => {
    const id = req.params.id;
if(deleteStudent(id)){
    res.status(204).send();
}else {
    res.status(404).json({
        message: `Suppression impossible: Etudiant(e) avec id ${id} non trouvé`
    })
}
});


//Homework for courses
app.get('/cours',(req,res) => {
    res.json(cours);
});

function createCours(courseToBeCreated){
    courseToBeCreated.id = uuidv4();
    cours.push(courseToBeCreated);
    return courseToBeCreated ;
}
app.get('/cours/:id',(req,res) => {
    const id = req.params.id;
    const currentCours = cours.find(cours=>cours.id===id);
    res.json(currentCours);
});

app.post('/cours',(req,res) => {
        //Recuperation de la réquete émise par le client
const createdCourse = createCours(req.body)
res.status(201).json({
    message: `Cours  crée avec un nouveau id :  ${createdCourse.id} `
})
    });

app.put('/cours/:id',(req,res) => {
});

app.delete('/cours/:id',(req,res) => {
});
//Lancer l'application avec un numero de port
let port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(`Demarrage au port ${port}! `);
})
