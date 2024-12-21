const express = require('express');
const {createStudent,getAllStudent,getStudentById, updateStudent,deleteStudent} = require('../services/student.service');


const router = express.Router();

router.get('/',(req,res) => {
    res.json(getAllStudent());
});

router.get('/:id',(req,res) => {
const id = req.params.id;
res.json(getStudentById(id));
});


    
router.post('/',(req,res) => {
    //Recuperation de la réquete émise par le client
const createdStudent = createStudent(req.body)
    res.status(201).json({
        message: `Etudiant(e) crée(e) avec un nouveau id :  ${createdStudent.id} `
    })
});

router.put('/:id',(req,res) => {
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

router.delete('/students/:id',(req,res) => {
    const id = req.params.id;
if(deleteStudent(id)){
    res.status(204).send();
}else {
    res.status(404).json({
        message: `Suppression impossible: Etudiant(e) avec id ${id} non trouvé`
    })
}
});



module.exports = router ;
