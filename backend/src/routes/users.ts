import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';
import { getUserProfile, updateUserProfile, updateTrialTopic } from '../controllers/userController';

const router = Router();

// Toutes les routes nécessitent une authentification
router.use(authenticateUser);

// GET /api/users/profile - Obtenir le profil utilisateur
router.get('/profile', getUserProfile);

// PUT /api/users/profile - Mettre à jour le profil utilisateur
router.put('/profile', updateUserProfile);

// PUT /api/users/trial-topic - Mettre à jour le sujet d'essai
router.put('/trial-topic', updateTrialTopic);

export default router;