
const  cours = require('../database/cours.db');
const {v4:uuidv4} =require('uuid');

function createCours(courseToBeCreated){
    courseToBeCreated.id = uuidv4();
    cours.push(courseToBeCreated);
    return courseToBeCreated ;
}

function   getAllCours(){
    return  cours.getAllFromCourses() ;
}

function getCoursById(id){
    return  cours.getCourseById();
}


function updateCours(id,coursToBeUpdated){
    const index = cours.findIndex(student=>student.id===id);
    if(index!==-1){
        cours[index]={...cours[index],
            ...coursToBeUpdated
        }

        return cours[index];
    }

    return null ;
}

function deleteCours(id){
    const index = cours.findIndex(c=>c.id===id);
    if(index!==-1){
        cours.splice(index,1);
        return  true;
    }

    return false ;
}

module.exports = {
    createCours,getAllCours,getCoursById,updateCours,deleteCours
}