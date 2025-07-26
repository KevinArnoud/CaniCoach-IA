import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';
import { getUserDogs, createDog, updateDog, deleteDog } from '../controllers/dogController';

const router = Router();

// Toutes les routes nécessitent une authentification
router.use(authenticateUser);

// GET /api/dogs - Obtenir tous les chiens de l'utilisateur
router.get('/', getUserDogs);

// POST /api/dogs - Créer un nouveau profil de chien
router.post('/', createDog);

// PUT /api/dogs/:dogId - Mettre à jour un profil de chien
router.put('/:dogId', updateDog);

// DELETE /api/dogs/:dogId - Supprimer un profil de chien
router.delete('/:dogId', deleteDog);

export default router;