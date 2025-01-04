
const  cours = require('../database/cours.db');

function createCours(courseToBeCreated){
    return cours.createCourse(courseToBeCreated) ;
}

function   getAllCours(){
    return  cours.getAllFromCourses() ;
}

function getCoursById(id){
    return  cours.getCourseById(id);
}


function updateCours(id,coursToBeUpdated){
    return cours.updateCourse(id,coursToBeUpdated);
}

function deleteCours(id){
    return cours.deleteCourse(id) ;
}

module.exports = {
    createCours,getAllCours,getCoursById,updateCours,deleteCours
}