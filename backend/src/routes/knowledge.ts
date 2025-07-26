import { Router } from 'express';
import { optionalAuth } from '../middleware/auth';
import { getKnowledgeBase, findTopicByKeywords } from '../controllers/knowledgeController';

const router = Router();

// GET /api/knowledge - Obtenir toute la base de connaissances (optionnel auth)
router.get('/', optionalAuth, getKnowledgeBase);

// POST /api/knowledge/find-topic - Trouver un sujet par mots-clés
router.post('/find-topic', optionalAuth, findTopicByKeywords);

export default router;