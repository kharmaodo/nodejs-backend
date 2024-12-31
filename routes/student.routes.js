const express = require('express');
const service = require('../services/student.service');

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
router.get('/', async(_, res) => {
      const all =  await service.getAllStudents() ;
        res.json(all);
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
router.get('/:id', async(req, res) => {
    const id = req.params.id;
     const current = await service.getStudentById(id);
        res.json(current);
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
 *               firstName:
 *                 type: string
 *                 description: Student's name
 *               lastName:
 *                 type: string
 *                 description: Student's first name
 *               email:
 *                 type: string
 *                 description: Student's email
 *               telephone:
 *                 type: string
 *                 description: Student's phone number
 *     responses:
 *       201:
 *         description: Student successfully created
 */
router.post('/', async(req, res) => {
    const {firstName, lastName, email, telephone} = req.body;
        const createdStudent = await service.createStudent({firstName, lastName, email, telephone});
        res.status(201).json({
           message: `Étudiant(e) créé(e) avec un nouveau ID : ${createdStudent}`
        });
});

/**
 * @swagger
 * /students/{id}:
 *   patch:
 *     summary: Partially update a student
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
 *               firstName:
 *                 type: string
 *                 description: Student's first name
 *               lastName:
 *                 type: string
 *                 description: Student's last name
 *               email:
 *                 type: string
 *                 description: Student's email
 *               telephone:
 *                 type: string
 *                 description: Student's phone number
 *     responses:
 *       200:
 *         description: Student updated
 *       404:
 *         description: Student not found
 */
router.patch('/:id', async(req, res) => {
    const id = req.params.id;
     const {firstName, lastName, email, telephone } = req.body; // Récupération des données à mettre à jour
    const studentToUpdate = await service.patchStudent(id,{firstName, lastName, email, telephone });
    if (studentToUpdate) {
        res.status(200).json({
            message: `Informations mises à jour pour l'étudiant avec id : ${studentToUpdate}`
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
router.delete('/:id', async(req, res) => {
        try {
            const id = req.params.id;
            if (await service.deleteStudent(id)) {
                res.status(204).send();
            } else {
                res.status(404).json({
                    message: `Suppression impossible: Cours avec id ${id} non trouvé`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: 'Erreur lors de la suppression du cours',
                error: error.message
            });
        }
});

module.exports = router;
