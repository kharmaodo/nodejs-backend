const { pool } = require('../database/db');
const fs = require('fs');
const path = require('path');
const courseFilePath = path.join(__dirname, 'cours.json');
const allCourses = JSON.parse(fs.readFileSync(courseFilePath, 'utf-8'));


const studentFilePath = path.join(__dirname, 'student.json');
const allStudents = JSON.parse(fs.readFileSync(studentFilePath, 'utf-8'));

function createTableCourseIfNotExits() {
    const query = `CREATE TABLE IF NOT EXISTS course (id SERIAL PRIMARY KEY, cours TEXT ,duration TEXT) `;
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Table course créée  avec success:');
        }
    });

}


async function createTableStudentIfNotExits() {
    const client = await pool.connect();
    const query = `CREATE TABLE IF NOT EXISTS students (id SERIAL PRIMARY KEY, firstName TEXT ,lastName TEXT,email  TEXT,telephone TEXT ) `;
    await client.query(query);
    console.log('Table students créée avec success:');
}

async function insertCourse() {
    const client = await pool.connect();

    try {
        for (const currentCourse of allCourses) {
            const { cours, duration } = currentCourse;

            const query = `INSERT into course(cours,duration) VALUES  ($1,$2) `;
            const values = [cours, duration];

            await client.query(query, values);

            console.log('Inserted:', cours);
        }
    } catch (error) {
        console.error(error);

    } finally {
        client.release();
    }

}


async function insertStudent() {
    const client = await pool.connect();

    try {
        for (const currentStudent of allStudents) {
            const { firstName, lastName, email, telephone } = currentStudent;

            const query = `INSERT into students(firstName,lastName,email,telephone) VALUES  ($1,$2,$3,$4) `;
            const values = [firstName, lastName, email, telephone];

            await client.query(query, values);

            console.log('Inserted:', firstName, lastName);
        }
    } catch (error) {
        console.error(error);

    } finally {
        client.release();
    }

}
createTableCourseIfNotExits();
//insertCourse();

//createTableStudentIfNotExits();
//insertStudent();