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


// Mock server data
const dataChatMock = [
  { id: 1, text: 'Hola! soy un bot, en que puedo ayudarte?', sender: 'bot' },
  { id: 2, text: 'Hola! Soy Alejo, cual es tu nombre?', sender: 'user' },
  { id: 3, text: 'Que pingo te importa. Gil!', sender: 'bot' },  
];

// Mock API call to fetch server statuses
const fetchChatMock = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un delay para simular un llamado real de API
  return chatData;
};

export default function Chatbotpanel() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialMessage();
  }, []);

  const fetchInitialMessage = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Inicio' }),
      });
      const data = await response.json();
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
        const response = await fetch('http://localhost:3001/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputMessage }),
        });
        const data = await response.json();
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

  return (
    <div className="flex h-screen bg-[#0d1117]">
      {/* Sidebar */}
      <div className="w-64 bg-[#161b22] border-r border-[#30363d]">
        <div className="p-4">
          <Button
            // onClick={() => window.history.back()}
            onClick={handleDashboardRedirect}
            className="w-full justify-start text-[#c9d1d9] bg-[#21262d] hover:bg-[#30363d] border-[#30363d] mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
            <span className="sr-only">a la página anterior</span>
          </Button>
          <Button className="w-full justify-start text-[#c9d1d9] bg-[#21262d] hover:bg-[#30363d] border-[#30363d]">
            <Plus className="mr-2 h-4 w-4" /> Nueva conversación
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-2 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-[#c9d1d9] hover:bg-[#30363d]"
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Conversación 1
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-[#c9d1d9] hover:bg-[#30363d]"
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Conversación 2
            </Button>
          </div>
        </ScrollArea>
        <div className="absolute bottom-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#c9d1d9] hover:bg-[#30363d]"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Configuración</span>
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
