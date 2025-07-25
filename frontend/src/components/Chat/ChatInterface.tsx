import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  dogName: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ dogName }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'user',
      content: 'Mon chiot mordille tout !',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'ai',
      content: "C'est normal ! La clé : rediriger vers un jouet.",
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

    // Simulation réponse IA (à remplacer par vraie IA plus tard)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Je comprends votre préoccupation concernant ${dogName}. Pouvez-vous me donner plus de détails sur ce comportement ?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-interface">
      {/* Zone des messages */}
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-bubble">
                <p className="message-content">{message.content}</p>
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
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Zone de saisie */}
      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="message-input"
            rows={1}
            disabled={isTyping}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="send-button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        
        {/* Bouton patte comme dans le design */}
        <div className="action-button-container">
          <button className="paw-button">
            <span className="paw-icon">🐾</span>
          </button>
        </div>
      </div>
    </div>
  );
};