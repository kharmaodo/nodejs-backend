const db = require('../database/db');
const fs = require('fs');
const path = require('path');
const courseFilePath = path.join(__dirname, 'cours.json');
const allCourses = JSON.parse(fs.readFileSync(courseFilePath, 'utf-8'));


const studentFilePath = path.join(__dirname, 'student.json');
const allStudents = JSON.parse(fs.readFileSync(studentFilePath, 'utf-8'));


 function insertCourse() {
    try {
        for (const currentCourse of allCourses) {
            const { cours, duration } = currentCourse;

            const query = `INSERT into course(cours,duration) VALUES  ($1,$2) `;
            const values = [cours, duration];

             db.run(query, values);

            console.log('Inserted:', cours);
        }
    } catch (error) {
        console.error(error);

    } finally {
    }

}


 function insertStudent() {
    try {
        for (const currentStudent of allStudents) {
            const { firstName, lastName, email, telephone } = currentStudent;

            const query = `INSERT into students(firstName,lastName,email,telephone) VALUES  ($1,$2,$3,$4) `;
            const values = [firstName, lastName, email, telephone];

            db.run(query, values);

            console.log('Inserted:', firstName, lastName);
        }
    } catch (error) {
        console.error(error);

    } finally {
    }

}
//insertCourse();

insertStudent();