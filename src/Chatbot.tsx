// src/Chatbot.tsx
import { useState, useEffect, useRef } from 'react';
import { supabase } from './utils/supabaseClient';
import { marked } from 'marked';
import OpenAI from 'openai';

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
      const queryEmbeddingResponse = await openai.embeddings.create({ model: 'text-embedding-3-small', input: userMessage });
      const queryEmbedding = queryEmbeddingResponse.data[0].embedding;
      const { data: documents, error } = await supabase.rpc('match_documents', {
        query_embedding: queryEmbedding, match_threshold: 0.70, match_count: 5,
      });

      if (error) throw new Error(`Erreur RPC Supabase: ${error.message}`);
      
      const contextText = documents.map((doc: any) => doc.content).join('\n\n---\n\n');
      const dogInfo = activeDog ? `Le chien s'appelle ${activeDog.name}, a ${calculateAge(activeDog.dateOfBirth)} et est de race ${activeDog.breed || 'non spécifiée'}.` : "Les informations du chien ne sont pas spécifiées.";
      const prompt = `
        Tu es CaniCoach... (Le prompt reste le même) ... Profil du Chien: ${dogInfo} ...
      `;
      const completionResponse = await openai.chat.completions.create({ model: 'gpt-4o', messages: [{ role: 'user', content: prompt }], temperature: 0.5 });
      return completionResponse.choices[0].message.content || "Je n'ai pas pu formuler de réponse.";
    } catch (err) {
      console.error("Erreur dans le processus RAG:", err);
      return "Désolé, je rencontre une difficulté technique pour vous répondre.";
    }
  }

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim() === '' || loading || !activeDog) return;
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

      <form onSubmit={handleSendMessage} className="message-input-form-mobile">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={!activeDog ? "Veuillez d'abord ajouter un chien..." : (loading ? 'CaniCoach répond...' : 'Tapez votre message...')} disabled={loading || !activeDog} className="chat-input-field" />
        <button type="submit" disabled={loading || input.trim() === '' || !activeDog} className="send-message-button" aria-label="Envoyer le message">
          {loading ? <span className="loading-paw-button">🐾</span> : '🐾'}
        </button>
      </form>
    </div>
  );
}