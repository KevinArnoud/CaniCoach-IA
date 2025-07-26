import { Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { AuthenticatedRequest } from '../middleware/auth';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Base de connaissances mock pour le développement
const mockKnowledgeBase = [
  {
    topic_id: 'mordillements',
    topic_name: 'Mordillements du chiot',
    target_audience: ['puppy'],
    trigger_keywords: ['mord', 'mordille', 'pince', 'mâchouille', 'dents', 'bite'],
    validation_response: "C'est une situation très courante et un comportement tout à fait normal chez le chiot. Ne vous inquiétez pas, il ne le fait pas par méchanceté et on va trouver une solution simple ensemble.",
    explanation: "Un chiot explore le monde avec sa gueule, un peu comme un bébé humain le ferait avec ses mains. Le mordillement est sa façon de découvrir les textures, de tester les limites et de jouer. Notre rôle n'est pas de lui interdire de mâchouiller, mais de lui apprendre ce qu'il a le droit de mordiller (ses jouets) et ce qu'il n'a pas le droit de mordiller (nos mains, nos pieds, les meubles).",
    action_plan: [
      { step: 1, text: "**Cessez toute interaction :** Dès que votre chiot vous mordille la main ou les vêtements, dites un \"Non\" ferme mais calme et cessez immédiatement le jeu et toute interaction." },
      { step: 2, text: "**Redirigez vers un jouet :** Proposez-lui immédiatement une alternative autorisée, comme un jouet à mâcher. Félicitez-le chaudement dès qu'il prend le jouet." },
      { step: 3, text: "**Anticipez et prévenez :** Lors des séances de jeu, ayez toujours un jouet à portée de main. S'il commence à s'exciter, proposez le jouet avant même qu'il ne touche votre peau." },
      { step: 4, text: "**Assurez-vous qu'il se dépense :** Un chiot qui mordille beaucoup est souvent un chiot qui a un trop-plein d'énergie. Prévoyez des séances de jeu régulières." }
    ],
    created_at: new Date().toISOString()
  },
  {
    topic_id: 'proprete',
    topic_name: 'Apprentissage de la propreté',
    target_audience: ['puppy'],
    trigger_keywords: ['pipi', 'caca', 'propreté', 'accident', 'urine', 'saleté', 'toilette'],
    validation_response: "L'apprentissage de la propreté demande de la patience et de la constance. Chaque chiot apprend à son rythme, et les accidents font partie du processus normal d'apprentissage.",
    explanation: "Un chiot n'a pas encore développé le contrôle de sa vessie et de ses intestins. Il ne comprend pas non plus naturellement où il doit faire ses besoins. C'est à nous de lui enseigner avec bienveillance et méthode.",
    action_plan: [
      { step: 1, text: "**Sortez régulièrement :** Toutes les 2-3 heures, après les repas, les siestes et les jeux. Restez dehors jusqu'à ce qu'il fasse ses besoins." },
      { step: 2, text: "**Récompensez immédiatement :** Dès qu'il fait dehors, félicitez-le chaleureusement et donnez-lui une friandise dans les 3 secondes." },
      { step: 3, text: "**Ne punissez jamais :** En cas d'accident, nettoyez sans commentaire. La punition retarde l'apprentissage et crée de l'anxiété." },
      { step: 4, text: "**Surveillez les signaux :** Apprendre à reconnaître quand il cherche, renifle ou tourne en rond pour anticiper ses besoins." }
    ],
    created_at: new Date().toISOString()
  }
];

export const getKnowledgeBase = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!supabase) {
      // Mode développement - retourner la base mock
      return res.json(mockKnowledgeBase);
    }

    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching knowledge base:', error);
      return res.status(500).json({ error: 'Failed to fetch knowledge base' });
    }

    res.json(data || []);
  } catch (error) {
    console.error('Get knowledge base error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const findTopicByKeywords = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const lowerMessage = message.toLowerCase();

    if (!supabase) {
      // Mode développement - utiliser la base mock
      for (const topic of mockKnowledgeBase) {
        if (topic.trigger_keywords.some(keyword => lowerMessage.includes(keyword))) {
          return res.json({
            topic_id: topic.topic_id,
            topic_name: topic.topic_name,
            response: {
              validation: topic.validation_response,
              explanation: topic.explanation,
              actionPlan: topic.action_plan.map(step => step.text)
            }
          });
        }
      }

      // Réponse par défaut
      return res.json({
        topic_id: 'general',
        topic_name: 'Questions générales',
        response: {
          validation: "Je comprends votre préoccupation. Chaque situation est unique et mérite une attention particulière.",
          explanation: "Pour vous donner les meilleurs conseils, j'aimerais en savoir plus sur le comportement spécifique de votre chien.",
          actionPlan: [
            "**Décrivez la situation :** Pouvez-vous me donner plus de détails sur ce que fait exactement votre chien ?",
            "**Contexte :** Dans quelles circonstances ce comportement se produit-il le plus souvent ?",
            "**Fréquence :** Est-ce que cela arrive souvent ou occasionnellement ?",
            "**Votre réaction :** Comment réagissez-vous habituellement dans ces moments ?"
          ]
        }
      });
    }

    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*');

    if (error) {
      console.error('Error searching knowledge base:', error);
      return res.status(500).json({ error: 'Failed to search knowledge base' });
    }

    // Rechercher le meilleur match
    for (const topic of data || []) {
      if (topic.trigger_keywords.some((keyword: string) => lowerMessage.includes(keyword))) {
        return res.json({
          topic_id: topic.topic_id,
          topic_name: topic.topic_name,
          response: {
            validation: topic.validation_response,
            explanation: topic.explanation,
            actionPlan: topic.action_plan.map((step: any) => step.text)
          }
        });
      }
    }

    // Réponse par défaut si aucun match
    res.json({
      topic_id: 'general',
      topic_name: 'Questions générales',
      response: {
        validation: "Je comprends votre préoccupation. Chaque situation est unique et mérite une attention particulière.",
        explanation: "Pour vous donner les meilleurs conseils, j'aimerais en savoir plus sur le comportement spécifique de votre chien.",
        actionPlan: [
          "**Décrivez la situation :** Pouvez-vous me donner plus de détails sur ce que fait exactement votre chien ?",
          "**Contexte :** Dans quelles circonstances ce comportement se produit-il le plus souvent ?",
          "**Fréquence :** Est-ce que cela arrive souvent ou occasionnellement ?",
          "**Votre réaction :** Comment réagissez-vous habituellement dans ces moments ?"
        ]
      }
    });
  } catch (error) {
    console.error('Find topic by keywords error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};