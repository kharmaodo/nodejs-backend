const express = require('express');
const { createCours,getAllCours,getCoursById,updateCours,deleteCours} = require('../services/cours.service');


const router = express.Router();

router.get('/',(req,res) => {
    res.json(getAllCours());
});


router.get('/:id',(req,res) => {
    const id = req.params.id;
    res.json(getCoursById(id));
});

router.post('/',(req,res) => {
        //Recuperation de la réquete émise par le client
const createdCourse = createCours(req.body)
res.status(201).json({
    message: `Cours  crée avec un nouveau id :  ${createdCourse.id} `
})
    });

router.put('/:id',(req,res) => {
    const id = req.params.id;
    const coursToBeUpdated = updateCours(id,req.body);
    if(coursToBeUpdated){
        res.status(201).json(`Informations modifiées pour le cours   avec id :  ${coursToBeUpdated.id}`);
    }else {
        res.status(404).json({
            message: `Cours avec id ${id} non trouvé`
        })
    }
});

router.delete('/:id',(req,res) => {
    const id = req.params.id;
    if(deleteCours(id)){
        res.status(204).send();
    }else {
        res.status(404).json({
            message: `Suppression impossible: Cours avec id ${id} non trouvé`
        })
    }
});

module.exports = router ;