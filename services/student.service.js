const {students} = require('../database/student.db')
const {v4:uuidv4} =require('uuid');

function createStudent(studentToBeCreated){
    studentToBeCreated.id = uuidv4();
    students.push(studentToBeCreated);
    return studentToBeCreated ;
}


function getAllStudent(){
    return students ;
}


function getStudentById(id){
    return  students.find(student=>student.id===id); ;
}

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

function deleteStudent(id){
    const index = students.findIndex(student=>student.id===id);
    if(index!==-1){
        students.splice(index,1);
        return  true;
    }

    return false ;
}

module.exports = {
    createStudent,getAllStudent,getStudentById, updateStudent,deleteStudent
}