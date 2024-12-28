const express = require('express');
const { createCours, getAllCours, getCoursById, updateCours, deleteCours } = require('../services/cours.service');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cours
 *   description: Gestion des cours
 */

/**
 * @swagger
 * /cours:
 *   get:
 *     summary: Récupérer tous les cours
 *     tags: [Cours]
 *     responses:
 *       200:
 *         description: Liste des cours
 */
router.get('/', (req, res) => {
    res.json(getAllCours());
});

/**
 * @swagger
 * /cours/{id}:
 *   get:
 *     summary: Récupérer un cours par ID
 *     tags: [Cours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du cours
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du cours
 *       404:
 *         description: Cours non trouvé
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json(getCoursById(id));
});

/**
 * @swagger
 * /cours:
 *   post:
 *     summary: Créer un nouveau cours
 *     tags: [Cours]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cours:
 *                 type: string
 *                 description: Nom du cours
 *               duration:
 *                 type: string
 *                 description: Durée du cours
 *     responses:
 *       201:
 *         description: Cours créé avec succès
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
router.post('/', (req, res) => {
    const { id, cours, duration } = req.body; // Récupération des données nécessaires
    const createdCourse = createCours({ id, cours, duration }); // Crée le cours avec l'ID
    res.status(201).json({
        message: `Cours créé avec un nouveau ID : ${createdCourse.id}`,
        course: createdCourse
    });
});

/**
 * @swagger
 * /cours/{id}:
 *   put:
 *     summary: Mettre à jour un cours
 *     tags: [Cours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du cours
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
 *                 description: Nom du cours
 *               duration:
 *                 type: string
 *                 description: Durée du cours
 *     responses:
 *       200:
 *         description: Cours mis à jour
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
 *         description: Cours non trouvé
 */
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { cours, duration } = req.body; // Récupération des données à mettre à jour
    const courseToUpdate = updateCours(id, { cours, duration }); // Met à jour le cours avec l'ID
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
 *     summary: Supprimer un cours
 *     tags: [Cours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du cours
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cours supprimé avec succès
 *       404:
 *         description: Cours non trouvé
 */
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (deleteCours(id)) {
        res.status(204).send();
    } else {
        res.status(404).json({
            message: `Suppression impossible: Cours avec id ${id} non trouvé`
        });
    }
});

module.exports = router;
