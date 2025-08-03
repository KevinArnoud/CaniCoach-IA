// src/Chatbot.tsx
import { useState, useEffect, useRef } from 'react';
import { supabase } from './utils/supabaseClient';
import { marked } from 'marked';
import OpenAI from 'openai';
import { SmartChatService } from './services/smartChatService';

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

type AuthSession = Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'];
interface Message { id: string; text: string; sender: 'user' | 'bot'; timestamp: string; }
interface ChatbotProps { session: AuthSession; onInteraction: () => void; }
interface DogProfile { dog_id: string; name: string; breed: string | null; photoUrl?: string | null; dateOfBirth?: string | null; }

export default function Chatbot({ session, onInteraction }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  
  // NOUVEAUX ÉTATS POUR GÉRER PLUSIEURS CHIENS
  const [userDogs, setUserDogs] = useState<DogProfile[]>([]);
  const [activeDog, setActiveDog] = useState<DogProfile | null>(null);

  useEffect(() => {
    async function loadUserDogs() {
      if (!session?.user) return;
      
      const { data, error } = await supabase
        .from('dogs')
        .select('dog_id, name, breed, photo_url, date_of_birth')
        .eq('owner_id', session.user.id);

      if (error) {
        console.error("Erreur lors du chargement des chiens:", error);
      } else if (data && data.length > 0) {
        setUserDogs(data);
        setActiveDog(data[0]); // Sélectionne le premier chien par défaut
      }
    }
    loadUserDogs();
  }, [session]);

  useEffect(() => { scrollToBottom(); }, [messages]);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  
  const calculateAge = (dateOfBirth: string | null | undefined): string => {
    if (!dateOfBirth) return 'Âge non spécifié';
    const birth = new Date(dateOfBirth);
    const now = new Date();
    const diffMonths = Math.ceil(Math.abs(now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
    return diffMonths < 12 ? `${diffMonths} mois` : `${Math.floor(diffMonths / 12)} an${Math.floor(diffMonths / 12) > 1 ? 's' : ''}`;
  };

  const handleDogSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDogId = event.target.value;
    const dogToActivate = userDogs.find(dog => dog.dog_id === selectedDogId);
    if (dogToActivate) {
      setActiveDog(dogToActivate);
      setMessages([]); // On nettoie la conversation quand on change de chien
    }
  };

  async function getBotResponse(userMessage: string): Promise<string> {
  try {
    // 🧠 NOUVELLE INTELLIGENCE : Analyser l'émotion de l'utilisateur
    const userEmotion = SmartChatService.detectEmotion(userMessage);
    const emotionalPrompt = SmartChatService.getEmotionalPrompt(userEmotion);
    
    // 🔍 Recherche dans votre base de connaissances (comme avant)
    const queryEmbeddingResponse = await openai.embeddings.create({ 
      model: 'text-embedding-3-small', 
      input: userMessage 
    });
    const queryEmbedding = queryEmbeddingResponse.data[0].embedding;
    
    const { data: documents, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding, 
      match_threshold: 0.70, 
      match_count: 5,
    });

    if (error) throw new Error(`Erreur RPC Supabase: ${error.message}`);
    
    const contextText = documents.map((doc: any) => doc.content).join('\n\n---\n\n');
    
    // 🐕 Informations du chien (améliorées)
    const dogInfo = activeDog ? 
      `Le chien s'appelle ${activeDog.name}, a ${calculateAge(activeDog.dateOfBirth)} et est de race ${activeDog.breed || 'non spécifiée'}.` :
      "Les informations du chien ne sont pas spécifiées.";

    // 🎯 NOUVEAU PROMPT AUTHENTIQUE ESPRIT DOG
    const prompt = `
${SmartChatService.getEspritDogPrompt()}

ADAPTATION ÉMOTIONNELLE :
${emotionalPrompt}

PROFIL DU CHIEN : ${dogInfo}

BASE DE CONNAISSANCES :
${contextText}

QUESTION DE L'UTILISATEUR : ${userMessage}

INSTRUCTIONS :
1. Commence par reconnaître la situation et rassurer si nécessaire
2. Explique le "pourquoi" derrière le comportement avec bienveillance  
3. Donne des conseils pratiques applicables immédiatement
4. Utilise le vocabulaire Esprit Dog quand c'est naturel
5. Termine par un encouragement avec le nom du chien
6. Garde un ton chaleureux et déculpabilisant

Réponds comme Tony Silvestre le ferait, avec sa bienveillance légendaire.
    `;

    // 🤖 Appel à OpenAI avec le nouveau prompt
    const completionResponse = await openai.chat.completions.create({ 
      model: 'gpt-4o', 
      messages: [{ role: 'user', content: prompt }], 
      temperature: 0.6,  // Un peu plus de chaleur humaine
      max_tokens: 800
    });

    const botResponse = completionResponse.choices[0].message.content || "Je n'ai pas pu formuler de réponse.";
    
    // 🎯 NOUVELLE INTELLIGENCE : Détecter si l'utilisateur est satisfait
    const isSatisfied = SmartChatService.detectSatisfaction(userMessage);
    if (isSatisfied) {
      console.log('🎉 Utilisateur satisfait détecté !');
      // TODO: Ici on pourra déclencher le paywall plus tard
    }

    return botResponse;
    
  } catch (err) {
    console.error("Erreur dans le processus RAG:", err);
    return "Désolé, je rencontre une difficulité technique. Pouvez-vous reformuler votre question ?";
  }
}

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim() === '' || loading || !activeDog) return;
    
    // NOUVEAU : Système de comptage local pour la démo
if (session?.user?.id) {
  try {
    // Récupérer les compteurs actuels
    const currentCount = parseInt(localStorage.getItem('canicoach_interactions') || '0');
    const problemsResolved = parseInt(localStorage.getItem('canicoach_problems_resolved') || '0');
    
    // Incrémenter
    const newCount = currentCount + 1;
    localStorage.setItem('canicoach_interactions', newCount.toString());
    
    console.log(`✅ Interaction ${newCount} comptée !`);
    console.log(`📊 Total interactions: ${newCount}, Problèmes résolus: ${problemsResolved}`);
    
  } catch (error) {
    console.error('Erreur comptage:', error);
  }
}

    onInteraction();
    const userMessageText = input;
    const userMessage: Message = { id: String(Date.now()), text: userMessageText, sender: 'user', timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const botResponseText = await getBotResponse(userMessageText);
    const botMessage: Message = { id: String(Date.now() + 1), text: botResponseText, sender: 'bot', timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, botMessage]);
    setLoading(false);

    // NOUVEAU : Détecter satisfaction (version locale)
const isSatisfied = SmartChatService.detectSatisfaction(userMessageText);
if (isSatisfied && session?.user?.id) {
  console.log('🎉 Problème résolu !');
  try {
    const currentProblems = parseInt(localStorage.getItem('canicoach_problems_resolved') || '0');
    const newProblems = currentProblems + 1;
    localStorage.setItem('canicoach_problems_resolved', newProblems.toString());
    
    console.log(`✅ Problème ${newProblems} résolu !`);
    console.log('💡 Déclenchement du paywall !');
    setShowPaywall(true);
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}
  };

  return (
    <div className="chatbot-mobile-layout">
      <div className="chatbot-header"><div className="header-title">CaniCoach</div></div>
      
      {userDogs.length > 0 && activeDog ? (
        <div className="dog-info-display with-select">
          <img src={activeDog.photoUrl || '/default-dog-avatar.png'} alt="Dog Avatar" className="dog-avatar-chat" />
          <div className="dog-details">
            <select value={activeDog.dog_id} onChange={handleDogSelectionChange} className="dog-select">
              {userDogs.map(dog => (
                <option key={dog.dog_id} value={dog.dog_id}>{dog.name}</option>
              ))}
            </select>
            <div className="dog-breed-age">{activeDog.breed} • {calculateAge(activeDog.dateOfBirth)}</div>
          </div>
        </div>
      ) : (
        <div className="dog-info-display">
          <p>Pour commencer, ajoutez un chien dans votre profil.</p>
        </div>
      )}

      <div className="messages-display">
        {activeDog && messages.length === 0 && (
          <div className="welcome-message">
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🐾</div>
            <div>Bonjour ! Quel est votre premier défi avec {activeDog.name} ?</div>
          </div>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`message-bubble ${msg.sender}`}>
            <div dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) as string }} />
          </div>
        ))}
        {loading && (
          <div className="message-bubble bot" style={{ opacity: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="loading-paw">🐾</div>
              <span>CaniCoach réfléchit...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

{showPaywall && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  }}>
    <div style={{
      backgroundColor: 'white',
      borderRadius: 'var(--border-radius-large)',
      padding: '32px 24px',
      maxWidth: '480px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
    }}>
      {/* En-tête */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '1.5rem',
          color: 'var(--color-text-dark)'
        }}>
          Félicitations !
        </h2>
        <h3 style={{ 
          margin: '0 0 16px 0', 
          fontSize: '1.1rem',
          color: 'var(--color-primary)',
          fontWeight: '600'
        }}>
          Vous avez résolu votre premier problème !
        </h3>
        <p style={{ 
          margin: 0, 
          color: 'var(--color-text-medium)',
          lineHeight: 1.5,
          fontSize: '0.95rem'
        }}>
          Pour débloquer tous les autres sujets et continuer à construire une relation parfaite avec votre chien, choisissez votre formule.
        </p>
      </div>

      {/* Plans d'abonnement */}
      <div style={{ marginBottom: '24px' }}>
        {/* Plan mensuel */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
          color: 'white',
          padding: '24px',
          borderRadius: 'var(--border-radius-medium)',
          marginBottom: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '12px', 
            right: '16px', 
            background: 'var(--color-success)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase'
          }}>
            Populaire
          </div>
     
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: '700' }}>
            Abonnement Mensuel
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '800', margin: '12px 0' }}>
            9,99€<span style={{ fontSize: '1rem', fontWeight: '400' }}>/mois</span>
          </div>
          
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: '16px 0 20px 0',
            fontSize: '0.9rem'
          }}>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px' }}>✅</span>
              Conseils illimités avec CaniCoach IA
            </li>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px' }}>✅</span>
              Jusqu'à 5 profils de chiens
            </li>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px' }}>✅</span>
              Suivi personnalisé et notifications
            </li>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px' }}>✅</span>
              Support prioritaire
            </li>
          </ul>
          
          <button 
            onClick={() => {
              alert('🧪 Démo : Redirection vers le paiement Stripe !');
              setShowPaywall(false);
            }}
            style={{ 
              backgroundColor: 'white',
              color: 'var(--color-primary)',
              fontWeight: '700',
              border: 'none',
              fontSize: '1rem',
              padding: '12px 20px',
              margin: '0',
              width: '100%',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Commencer maintenant
          </button>
        </div>

        {/* Plan annuel */}
        <div style={{ 
          border: '2px solid var(--color-primary)',
          padding: '24px',
          borderRadius: 'var(--border-radius-medium)',
          backgroundColor: 'var(--color-card-background-light)'
        }}>
          <h3 style={{ 
            margin: '0 0 8px 0', 
            color: 'var(--color-text-dark)', 
            fontSize: '1.2rem',
            fontWeight: '700'
          }}>
            Abonnement Annuel
          </h3>
          <div style={{ 
            fontSize: '2rem',
            fontWeight: '800', 
            margin: '12px 0',
            color: 'var(--color-primary)'
          }}>
            99,99€<span style={{ fontSize: '1rem', fontWeight: '400' }}>/an</span>
          </div>
          <div style={{ 
            color: 'var(--color-success)',
            fontWeight: '700',
            marginBottom: '16px',
            fontSize: '0.9rem'
          }}>
            💰 Économisez 17% ! (2 mois gratuits)
          </div>
          
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: '16px 0 20px 0',
            color: 'var(--color-text-dark)',
            fontSize: '0.9rem'
          }}>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px' }}>✅</span>
              Tout du plan mensuel
            </li>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px' }}>✅</span>
              Profils chiens illimités
            </li>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px' }}>✅</span>
              Analyses comportementales avancées
            </li>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px' }}>✅</span>
              Accès aux nouveautés en avant-première
            </li>
          </ul>
          
          <button 
            onClick={() => {
              alert('🧪 Démo : Redirection vers le paiement annuel !');
              setShowPaywall(false);
            }}
            style={{
              fontSize: '1rem',
              padding: '12px 20px',
              margin: '0',
              width: '100%',
              borderRadius: '8px',
              backgroundColor: 'var(--color-card-background-light)',
              color: 'var(--color-primary)',
              border: '2px solid var(--color-primary)',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Choisir l'annuel
          </button>
        </div>
      </div>

      {/* Garantie */}
      <div style={{ 
        margin: '24px 0',
        padding: '16px',
        backgroundColor: 'var(--color-primary-light)',
        borderRadius: 'var(--border-radius-medium)',
        border: '1px solid var(--color-primary)',
        textAlign: 'center'
      }}>
        <h4 style={{ 
          margin: '0 0 8px 0', 
          color: 'var(--color-primary)',
          fontSize: '1rem'
        }}>
          🛡️ Garantie satisfait ou remboursé 30 jours
        </h4>
        <p style={{ 
          margin: 0, 
          fontSize: '0.85rem',
          color: 'var(--color-text-medium)'
        }}>
          Vous pouvez annuler à tout moment. Aucun engagement.
        </p>
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--color-text-medium)',
        marginTop: '16px'
      }}>
        💳 Paiement sécurisé • 🇫🇷 Développé en France avec ❤️
      </div>

      {/* Bouton fermer pour la démo */}
      <button
        onClick={() => setShowPaywall(false)}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: 'var(--color-text-medium)',
          padding: '4px'
        }}
      >
        ×
      </button>
    </div>
  </div>
)}
      <form onSubmit={handleSendMessage} className="message-input-form-mobile">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={!activeDog ? "Veuillez d'abord ajouter un chien..." : (loading ? 'CaniCoach répond...' : 'Tapez votre message...')} disabled={loading || !activeDog} className="chat-input-field" />
        <button type="submit" disabled={loading || input.trim() === '' || !activeDog} className="send-message-button" aria-label="Envoyer le message">
          {loading ? <span className="loading-paw-button">🐾</span> : '🐾'}
        </button>
      </form>
    </div>
  );
}