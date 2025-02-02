'use client';

// components/child/Chatpanel.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Plus, Settings, MessageSquare, ArrowLeft } from 'lucide-react';

// Services
import { sendChatMessage } from '../../services/api.js';

// Context
import { useLoading } from '../../context/LoadingContext.jsx';

export default function Chatbotpanel() {
  const { setIsLoading } = useLoading();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();
  const [isSidebarFull, setIsSidebarFull] = useState(true);

  useEffect(() => {
    fetchInitialMessage();
  }, []);

  const fetchInitialMessage = async () => {
    try {
      const data = await sendChatMessage('Inicio', setIsLoading);
      setMessages([{ id: 1, text: data.message, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching initial message:', error);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');

      try {
        const data = await sendChatMessage(inputMessage, setIsLoading);
        const botResponse = {
          id: messages.length + 2,
          text: data.message,
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleDashboardRedirect = () => {
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarFull(!isSidebarFull);
  };

  return (
    <div className="flex h-screen bg-[#0d1117]">
      {/* Sidebar */}
      <div
        className={`bg-[#161b22] border-r border-[#30363d] transition-all duration-300 ${
          isSidebarFull ? 'w-64' : 'w-16'
        }`}
      >
        <div className="p-4 flex flex-col space-y-2">
          <Button
            variant="ghost"
            className={`text-[#c9d1d9] hover:bg-[#30363d] ${
              isSidebarFull ? 'w-full justify-start' : 'w-8 h-8 p-0'
            }`}
            onClick={handleDashboardRedirect}
          >
            <ArrowLeft className="h-5 w-5" />
            {isSidebarFull && <span className="ml-2">Regresar</span>}
          </Button>
          <Button
            variant="ghost" 
            className={`text-[#c9d1d9] hover:bg-[#30363d] ${
              isSidebarFull ? 'w-full justify-start' : 'w-8 h-8 p-0'
            }`}
          >
            <Plus className="h-5 w-5" />
            {isSidebarFull && <span className="ml-2">Nuevo chat</span>}
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#c9d1d9] hover:bg-[#30363d]"
            onClick={toggleSidebar}
          >
            {isSidebarFull ? (
              <ArrowLeft className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            <span className="sr-only">
              {isSidebarFull ? 'Contraer' : 'Expandir'}
            </span>
          </Button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start mb-4 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <Avatar className="mr-2">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Bot"
                  />
                  <AvatarFallback>Bot</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg max-w-[70%] ${
                  message.sender === 'user'
                    ? 'bg-[#1f6feb] text-white'
                    : 'bg-[#21262d] text-[#c9d1d9] border border-[#30363d]'
                }`}
              >
                {message.text}
              </div>
              {message.sender === 'user' && (
                <Avatar className="ml-2">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="border-t border-[#30363d] p-4 bg-[#161b22]">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow bg-[#0d1117] border-[#30363d] text-[#c9d1d9]"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-[#238636] hover:bg-[#2ea043] text-white"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar mensaje</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
