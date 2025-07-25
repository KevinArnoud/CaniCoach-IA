import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from '../Icons/IconSet';
import './ChatInterface.css';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  dogName: string;
  dogBreed?: string;
  dogAge?: string;
}

// Base de connaissances simulée basée sur Esprit Dog
const knowledgeBase = {
  mordillements: {
    keywords: ['mord', 'mordille', 'pince', 'mâchouille', 'dents', 'bite'],
    response: {
      validation: "C'est une situation très courante et un comportement tout à fait normal chez le chiot. Ne vous inquiétez pas, il ne le fait pas par méchanceté et on va trouver une solution simple ensemble.",
      explanation: "Un chiot explore le monde avec sa gueule, un peu comme un bébé humain le ferait avec ses mains. Le mordillement est sa façon de découvrir les textures, de tester les limites et de jouer. Notre rôle n'est pas de lui interdire de mâchouiller, mais de lui apprendre ce qu'il a le droit de mordiller (ses jouets) et ce qu'il n'a pas le droit de mordiller (nos mains, nos pieds, les meubles).",
      actionPlan: [
        "**Cessez toute interaction :** Dès que votre chiot vous mordille la main ou les vêtements, dites un \"Non\" ferme mais calme et cessez immédiatement le jeu et toute interaction.",
        "**Redirigez vers un jouet :** Proposez-lui immédiatement une alternative autorisée, comme un jouet à mâcher. Félicitez-le chaudement dès qu'il prend le jouet.",
        "**Anticipez et prévenez :** Lors des séances de jeu, ayez toujours un jouet à portée de main. S'il commence à s'exciter, proposez le jouet avant même qu'il ne touche votre peau.",
        "**Assurez-vous qu'il se dépense :** Un chiot qui mordille beaucoup est souvent un chiot qui a un trop-plein d'énergie. Prévoyez des séances de jeu régulières."
      ]
    }
  },
  proprete: {
    keywords: ['pipi', 'caca', 'propreté', 'accident', 'urine', 'saleté', 'toilette'],
    response: {
      validation: "L'apprentissage de la propreté demande de la patience et de la constance. Chaque chiot apprend à son rythme, et les accidents font partie du processus normal d'apprentissage.",
      explanation: "Un chiot n'a pas encore développé le contrôle de sa vessie et de ses intestins. Il ne comprend pas non plus naturellement où il doit faire ses besoins. C'est à nous de lui enseigner avec bienveillance et méthode.",
      actionPlan: [
        "**Sortez régulièrement :** Toutes les 2-3 heures, après les repas, les siestes et les jeux. Restez dehors jusqu'à ce qu'il fasse ses besoins.",
        "**Récompensez immédiatement :** Dès qu'il fait dehors, félicitez-le chaleureusement et donnez-lui une friandise dans les 3 secondes.",
        "**Ne punissez jamais :** En cas d'accident, nettoyez sans commentaire. La punition retarde l'apprentissage et crée de l'anxiété.",
        "**Surveillez les signaux :** Apprendre à reconnaître quand il cherche, renifle ou tourne en rond pour anticiper ses besoins."
      ]
    }
  },
  aboiements: {
    keywords: ['aboie', 'aboiement', 'bruit', 'crie', 'hurle', 'vocalise'],
    response: {
      validation: "Les aboiements sont un moyen de communication naturel pour votre chien. Il est important de comprendre ce qu'il essaie de vous dire plutôt que de simplement vouloir l'arrêter.",
      explanation: "Un chien peut aboyer pour différentes raisons : demander de l'attention, exprimer de l'excitation, alerter d'un danger, ou parfois par ennui ou anxiété. Identifier la cause nous aide à apporter la bonne réponse.",
      actionPlan: [
        "**Identifiez la cause :** Observez dans quelles situations votre chien aboie le plus (visiteurs, bruits extérieurs, solitude, jeu).",
        "**Ne criez pas :** Crier par-dessus ses aboiements l'encourage à aboyer plus fort. Restez calme et utilisez un ton posé.",
        "**Redirigez son attention :** Proposez-lui une activité alternative comme un jouet ou un exercice de concentration.",
        "**Récompensez le calme :** Félicitez et récompensez votre chien quand il est calme et silencieux, pas seulement quand il arrête d'aboyer."
      ]
    }
  },
  socialisation: {
    keywords: ['socialisation', 'autres chiens', 'peur', 'timide', 'agressif', 'rencontre'],
    response: {
      validation: "La socialisation est cruciale pour le développement équilibré de votre chien. Il n'est jamais trop tard pour améliorer ses compétences sociales, même si c'est plus facile quand il est jeune.",
      explanation: "Un chien bien socialisé est un chien confiant qui sait interagir positivement avec ses congénères, les humains et son environnement. La socialisation se fait par des expériences positives répétées.",
      actionPlan: [
        "**Commencez progressivement :** Exposez votre chien à de nouvelles situations de manière contrôlée et positive.",
        "**Choisissez de bons partenaires :** Privilégiez les rencontres avec des chiens calmes et bien éduqués pour les premières expériences.",
        "**Restez positif :** Votre énergie influence votre chien. Restez détendu et confiant lors des rencontres.",
        "**Respectez son rythme :** Ne forcez jamais une interaction. Laissez votre chien s'approcher à son rythme et récompensez les comportements calmes."
      ]
    }
  }
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ dogName, dogBreed, dogAge }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Bonjour ! Je suis CaniCoach IA, votre assistant personnel pour l'éducation canine bienveillante. Je suis ravi de faire la connaissance de ${dogName} ! 🐕\n\nJe suis là pour vous accompagner dans l'éducation de votre compagnon en utilisant les méthodes positives d'Esprit Dog. Quel défi souhaitez-vous relever ensemble aujourd'hui ?`,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (userMessage: string): any => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [topic, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.response;
      }
    }
    
    // Réponse par défaut
    return {
      validation: "Je comprends votre préoccupation. Chaque situation est unique et mérite une attention particulière.",
      explanation: "Pour vous donner les meilleurs conseils, j'aimerais en savoir plus sur le comportement spécifique de votre chien.",
      actionPlan: [
        "**Décrivez la situation :** Pouvez-vous me donner plus de détails sur ce que fait exactement votre chien ?",
        "**Contexte :** Dans quelles circonstances ce comportement se produit-il le plus souvent ?",
        "**Fréquence :** Est-ce que cela arrive souvent ou occasionnellement ?",
        "**Votre réaction :** Comment réagissez-vous habituellement dans ces moments ?"
      ]
    };
  };

  const formatAIResponse = (response: any): string => {
    let formattedResponse = `**🤗 Validation & Déculpabilisation**\n${response.validation}\n\n`;
    formattedResponse += `**🧠 Pourquoi ce comportement ?**\n${response.explanation}\n\n`;
    formattedResponse += `**📋 Plan d'action étape par étape :**\n`;
    
    response.actionPlan.forEach((step: string, index: number) => {
      formattedResponse += `\n${index + 1}. ${step}`;
    });
    
    formattedResponse += `\n\n💪 **Encouragement :** Rappelez-vous que l'éducation canine demande de la patience et de la constance. Vous êtes sur la bonne voie en cherchant des solutions bienveillantes pour ${dogName} !`;
    
    return formattedResponse;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulation de réflexion de l'IA
    setTimeout(() => {
      const response = findBestResponse(inputMessage);
      const formattedResponse = formatAIResponse(response);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: formattedResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Délai réaliste variable
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageContent = (content: string) => {
    // Convertir le markdown simple en HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="chat-interface">
      {/* Zone des messages */}
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-bubble">
                <div 
                  className="message-content"
                  dangerouslySetInnerHTML={{ 
                    __html: formatMessageContent(message.content) 
                  }}
                />
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message ai">
              <div className="message-bubble typing">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
                <div className="typing-text">CaniCoach réfléchit...</div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Zone de saisie améliorée */}
      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Décrivez le comportement de ${dogName}...`}
            className="message-input"
            rows={1}
            disabled={isTyping}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="send-button"
            title="Envoyer le message"
          >
            <SendIcon size={18} />
          </button>
        </div>
        
        {/* Suggestions rapides */}
        <div className="quick-suggestions">
          <button 
            className="suggestion-chip"
            onClick={() => setInputMessage('Mon chiot mordille tout le temps')}
            disabled={isTyping}
          >
            Mordillements
          </button>
          <button 
            className="suggestion-chip"
            onClick={() => setInputMessage('Problème de propreté')}
            disabled={isTyping}
          >
            Propreté
          </button>
          <button 
            className="suggestion-chip"
            onClick={() => setInputMessage('Mon chien aboie beaucoup')}
            disabled={isTyping}
          >
            Aboiements
          </button>
          <button 
            className="suggestion-chip"
            onClick={() => setInputMessage('Socialisation avec autres chiens')}
            disabled={isTyping}
          >
            Socialisation
          </button>
        </div>
      </div>
    </div>
  );
};