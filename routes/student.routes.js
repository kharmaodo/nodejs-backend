const express = require('express');
const { createStudent, getAllStudent, getStudentById, updateStudent, deleteStudent } = require('../services/student.service');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Étudiants
 *   description: Gestion des étudiants
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Récupérer tous les étudiants
 *     tags: [Étudiants]
 *     responses:
 *       200:
 *         description: Liste des étudiants
 */
router.get('/', (req, res) => {
    res.json(getAllStudent());
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Récupérer un étudiant par ID
 *     tags: [Étudiants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'étudiant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'étudiant
 *       404:
 *         description: Étudiant non trouvé
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json(getStudentById(id));
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Créer un nouvel étudiant
 *     tags: [Étudiants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de l'étudiant
 *               prenom:
 *                 type: string
 *                 description: Prénom de l'étudiant
 *               email:
 *                 type: string
 *                 description: Email de l'étudiant
 *               telephone:
 *                 type: string
 *                 description: Numéro de téléphone de l'étudiant
 *     responses:
 *       201:
 *         description: Étudiant créé avec succès
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
 *     summary: Mettre à jour un étudiant
 *     tags: [Étudiants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'étudiant
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de l'étudiant
 *               prenom:
 *                 type: string
 *                 description: Prénom de l'étudiant
 *               email:
 *                 type: string
 *                 description: Email de l'étudiant
 *               telephone:
 *                 type: string
 *                 description: Numéro de téléphone de l'étudiant
 *     responses:
 *       200:
 *         description: Étudiant mis à jour
 *       404:
 *         description: Étudiant non trouvé
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
 *     summary: Supprimer un étudiant
 *     tags: [Étudiants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'étudiant
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Étudiant supprimé avec succès
 *       404:
 *         description: Étudiant non trouvé
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
