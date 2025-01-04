const db = require('../database/db');

function getAllFromStudents() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM students';
        db.all(query,[],function (err, rows) {
            if (err) {
                console.error('Database error while fetching students:', {
                    error: err.message,
                    query: query,
                    timestamp: new Date().toISOString()
                });
                return reject(new Error('Failed to fetch students'));
            }
            if (!rows || !rows.length) {
                return resolve([]);
            }
            resolve(rows);
        });
    });
}

function getStudentById(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM students WHERE id = ?';
        db.get(query, [id], function (err, row) {
            if (err) {
                console.error('Database error while fetching student by id:', {
                    error: err.message,
                    query: query,
                    timestamp: new Date().toISOString()
                });
                return reject(new Error('Failed to fetch student by id'));
            }
            if (!row) {
                return resolve(null);
            }
            resolve(row);
        });
    });
}


function patchStudent(id, student) {
    return new Promise((resolve, reject) => {
        // Input validation
        if (!id || isNaN(id)) {
            console.log('Invalid student ID:', id);
            return reject(new Error('Invalid student ID'));
        }
        // Check if student exists
        getStudentById(id).then((existingStudent) => {
            if (!existingStudent) {
                console.log('Student not found:', id);
                return reject(new Error('Student not found'));
            }
        });
            // Prepare fields to update
            const fields = [];
            const values = [];
            for (const key in student) {
                if (student.hasOwnProperty(key) && student[key] !== undefined) {
                    fields.push(`${key} = ?`);
                    values.push(student[key]);
                }
            }
            if (fields.length === 0) {
                return resolve(false); // No fields to update
            }
            values.push(id);

            // Update student
            const query = `UPDATE students SET ${fields.join(', ')} WHERE id = ?`;
            console.log('Query:', query);
            db.run(query, values, function (err) {
                if (err) {
                    console.error('Database error while patching student:', {
                        error: err.message,
                        student: student,
                        timestamp: new Date().toISOString()
                    });
                    return reject(new Error('Failed to patch student'));
                }
                console.log('Patched student with ID:', id);
                resolve(true);
            });
    });
}



function createStudent(student) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO students (firstName, lastName, email, telephone) VALUES (?, ?, ?, ?)';
        db.run(query, [student.firstName, student.lastName, student.email,student.telephone], function (err) {
            if (err) {
                console.error('Database error while creating student:', {
                    error: err.message,
                    student: student,
                    timestamp: new Date().toISOString()
                });
                return reject(new Error('Failed to create student'));
            }
            console.log('Created student with ID:', this.lastID);
            resolve(this.lastID);
        });
    });
}

function deleteStudent(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM students WHERE id = ?';
        db.run(query, [id], function (err) {
            if (err) {
                console.error('Database error while deleting student:', {
                    error: err.message,
                    studentId: id,
                    timestamp: new Date().toISOString()
                });
                return reject(new Error('Failed to delete student'));
            }
            console.log('Deleted student with ID:', id);
            resolve(id);
        });
    });
}



module.exports = { 
    getAllFromStudents: getAllFromStudents,
    getStudentById: getStudentById,
    createStudent:createStudent,
    patchStudent:patchStudent,
    deleteStudent:deleteStudent
}