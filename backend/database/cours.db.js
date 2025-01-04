const db = require('../database/db');

/**
 * Get all courses from the database
 * @returns {Promise<Array>} Array of course objects
 */
function getAllFromCourses() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM course';

        db.all(query, [], function (err, rows) {
            if (err) {
                // Log error with more context
                console.error('Database error while fetching courses:', {
                    error: err.message,
                    query: query,
                    timestamp: new Date().toISOString()
                });
                return reject(new Error('Failed to fetch courses'));
            }

            // If no courses found, return empty array instead of null
            if (!rows || !rows.length) {
                return resolve([]);
            }

            resolve(rows);
        });
    });
}

/**
 * Get a single course by ID
 * @param {number} id - Course ID
 * @returns {Promise<Object|null>} Course object or null if not found
 */
function getCourseById(id) {
    return new Promise((resolve, reject) => {
        // Input validation
        if (!id || isNaN(id)) {
            console.log('Invalid course ID:', id);
            return reject(new Error('Invalid course ID'));
        }

        console.log('Fetching course with ID:', id);
        const query = 'SELECT * FROM course WHERE id=?';

        db.all(query, [id], function (err, row) {
            if (err) {
                console.error('Database error while fetching course:', {
                    error: err.message,
                    courseId: id,
                    timestamp: new Date().toISOString()
                });
                return reject(new Error('Failed to fetch course'));
            }
            console.log('Database response:', row);
            resolve(row);
        });
    });
}


//write the function createCourse
function createCourse(course) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO course (cours, duration) VALUES (?, ?)';
        db.run(query, [course.cours, course.duration], function (err) {
            if (err) {
                console.error('Database error while creating course:', {
                    error: err.message,
                    course: course,
                    timestamp: new Date().toISOString()
                });
                return reject(new Error('Failed to create course'));
            }

            console.log('Created course with ID:', this.lastID);
            resolve(this.lastID);
        });
    });
}

//  write the function updateCourse testing if the id is a number and if the course exists for this id  and if the course is updated
function updateCourse(id, course) {
    return new Promise((resolve, reject) => {
        // Input validation
        if (!id || isNaN(id)) {
            console.log('Invalid course ID:', id);
            return reject(new Error('Invalid course ID'));
        }
        // Check if course exists
        getCourseById(id).then((course) => {
            if (!course) {
                console.log('Course not found:', id);
                return reject(new Error('Course not found'));
            }
        });
        const query = 'UPDATE course SET cours=?, duration=? WHERE id=?';
        db.run(query, [course.cours, course.duration, id], function (err) {
            if (err) {
                console.error('Database error while updating course:', {
                    error: err.message,
                    courseId: id,
                    course: course,
                    timestamp: new Date().toISOString()
                });
                return reject(new Error('Failed to update course'));
            }

            console.log('Updated course with ID:', id);
            resolve(true);
        });
    });
}

//  write the function deleteCourse testing if the id is a number and if the course exists for this id  and if the course is deleted    
function deleteCourse(id) {
    return new Promise((resolve, reject) => {
        // Input validation
        if (!id || isNaN(id)) {
            console.log('Invalid course ID:', id);
            return reject(new Error('Invalid course ID'));
        }
        // Check if course exists
        getCourseById(id).then((course) => {
            if (!course) {
                console.log('Course not found:', id);
                return reject(false);
            }
        });
        const query = 'DELETE FROM course WHERE id=?';
        db.run(query, [id], function (err) {
            if (err) {
                console.error('Database error while deleting course:', {
                    error: err.message,
                    courseId: id,
                    timestamp: new Date().toISOString()
                });
                return reject(false);
            }

            console.log('Deleted course with ID:', id);
            resolve(true);
        });
    });
}


module.exports = {
    getAllFromCourses: getAllFromCourses,
    getCourseById: getCourseById,
    createCourse:createCourse,
    updateCourse:updateCourse,
    deleteCourse:deleteCourse
};