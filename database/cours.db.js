// models/courseModel.js
const db = require('../database/db');

/**
 * Get all courses from the database
 * @returns {Promise<Array>} Array of course objects
 */
function getAllFromCourses() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM course';
        
        db.all(query, [], function(err, rows) {
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
            return reject(new Error('Invalid course ID'));
        }

        console.log('Fetching course with ID:', id);
        const query = 'SELECT * FROM course WHERE id = ?';
    
        db.all(query, [id], function(err, row) {
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


/**
 * Get a single course by ID
 * @param {number} id - Course ID
 * @returns {Promise<Object|null>} Course object or null if not found
 */
function getCourseById(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM course WHERE id = ?';
        
        db.get(query, [id], function(err, row) {
            if (err) {
                console.error('Database error while fetching course:', {
                    error: err.message,
                    query: query,
                    params: { id },
                    timestamp: new Date().toISOString()
                });
                return reject(new Error('Failed to fetch course'));
            }
            
            resolve(row || null);
        });
    });
}


module.exports = {
    getAllFromCourses: getAllFromCourses,
    getCourseById: getCourseById,
};