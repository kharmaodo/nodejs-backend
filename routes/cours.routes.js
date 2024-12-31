const express = require('express');
const service = require('../services/cours.service');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management
 */

/**
 * @swagger
 * /cours:
 *   get:
 *     summary: Retrieve all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get('/', async(req, res) => {
    const all =  await service.getAllCours() ;
    res.json(all);
});

/**
 * @swagger
 * /cours/{id}:
 *   get:
 *     summary: Retrieve a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course details
 *       404:
 *         description: Course not found
 */
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const current = await service.getCoursById(id);
    res.json(current);
});

/**
 * @swagger
 * /cours:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cours:
 *                 type: string
 *                 description: Course name
 *               duration:
 *                 type: string
 *                 description: Course duration
 *     responses:
 *       201:
 *         description: Course successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 course:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     cours:
 *                       type: string
 *                     duration:
 *                       type: string
 */
router.post('/', async(req, res) => {
    const { cours, duration } = req.body; // Récupération des données nécessaires
    const createdCourse = await service.createCours({ cours, duration });
    res.status(201).json({
        message: `Cours créé avec un nouveau ID : ${createdCourse}`
    });
});

/**
 * @swagger
 * /cours/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cours:
 *                 type: string
 *                 description: Course name
 *               duration:
 *                 type: string
 *                 description: Course duration
 *     responses:
 *       200:
 *         description: Course updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 course:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     cours:
 *                       type: string
 *                     duration:
 *                       type: string
 *       404:
 *         description: Course not found
 */
router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const { cours, duration } = req.body; // Récupération des données à mettre à jour
    const courseToUpdate = await service.updateCours(id, { cours, duration }); // Met à jour le cours avec l'ID
    if (courseToUpdate) {
        res.status(200).json({
            message: `Informations mises à jour pour le cours avec id : ${courseToUpdate.id}`,
            course: courseToUpdate
        });
    } else {
        res.status(404).json({
            message: `Cours avec id ${id} non trouvé`
        });
    }
});

/**
 * @swagger
 * /cours/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Course successfully deleted
 *       404:
 *         description: Course not found
 */
router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        if (await service.deleteCours(id)) {
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
