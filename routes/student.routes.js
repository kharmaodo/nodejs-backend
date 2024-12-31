const express = require('express');
const { createStudent, getAllStudent, getStudentById, updateStudent, deleteStudent } = require('../services/student.service');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 */
router.get('/', (req, res) => {
    res.json(getAllStudent());
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student details
 *       404:
 *         description: Student not found
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json(getStudentById(id));
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Student's name
 *               firstName:
 *                 type: string
 *                 description: Student's first name
 *               email:
 *                 type: string
 *                 description: Student's email
 *               phone:
 *                 type: string
 *                 description: Student's phone number
 *     responses:
 *       201:
 *         description: Student successfully created
 */
router.post('/', (req, res) => {
    const createdStudent = createStudent(req.body);
    res.status(201).json({
        message: `Étudiant(e) créé(e) avec un nouveau ID : ${createdStudent.id}`
    });
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Student's name
 *               firstName:
 *                 type: string
 *                 description: Student's first name
 *               email:
 *                 type: string
 *                 description: Student's email
 *               phone:
 *                 type: string
 *                 description: Student's phone number
 *     responses:
 *       200:
 *         description: Student updated
 *       404:
 *         description: Student not found
 */
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const studentToUpdate = updateStudent(id, req.body);
    if (studentToUpdate) {
        res.status(200).json({
            message: `Informations mises à jour pour l'étudiant avec id : ${studentToUpdate.id}`
        });
    } else {
        res.status(404).json({
            message: `Étudiant avec id ${id} non trouvé`
        });
    }
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Student successfully deleted
 *       404:
 *         description: Student not found
 */
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (deleteStudent(id)) {
        res.status(204).send();
    } else {
        res.status(404).json({
            message: `Suppression impossible: Étudiant avec id ${id} non trouvé`
        });
    }
});

module.exports = router;
