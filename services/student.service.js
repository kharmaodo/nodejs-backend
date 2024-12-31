const student = require('../database/student.db')

function createStudent(studentToBeCreated){
    return student.createStudent(studentToBeCreated) ;
}


function getAllStudents(){
    return student.getAllFromStudents(); ;
}


function getStudentById(id){
    return  student.getStudentById(id);
}

function updateStudent(id,studentToBeUpdated){
    return student.updateStudent(id,studentToBeUpdated) ;
}


function patchStudent(id,studentToBeUpdated){
    return student.patchStudent(id,studentToBeUpdated) ;
}

function deleteStudent(id){
    return student.deleteStudent(id); ;
}

module.exports = {
    createStudent,getAllStudents,getStudentById, updateStudent,patchStudent,deleteStudent
}