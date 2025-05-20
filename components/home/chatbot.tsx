'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PawPrint as Paw, Send, X, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Pre-programmed responses for demo
const botResponses: Record<string, string> = {
  "hello": "Hi there! I'm PawBuddy, your guide to pet-friendly cities. How can I help you today?",
  "hi": "Hello! I'm PawBuddy, your guide to pet-friendly cities. How can I help you today?",
  "help": "I can help with information about pet-friendly parks, restaurants, adoption centers, and city initiatives. What would you like to know about?",
  "parks": "Our city has 15 pet-friendly parks! The most popular ones are Central Bark, Paws Playground, and Canine Commons. Each has off-leash areas, water stations, and waste disposal facilities.",
  "restaurants": "There are over 50 pet-friendly restaurants in our city! Most have outdoor patios where your furry friends are welcome. Some even offer special pet menus!",
  "adopt": "Looking to adopt? That's wonderful! We have 5 shelters in the city with many lovely pets looking for forever homes. Check out the Adoption Carousel above to see some of our available pets!",
  "volunteer": "We always need volunteers! You can sign up using our Volunteer Form. We need help with walking dogs, organizing events, and social media.",
  "events": "We host monthly pet-friendly events! Our next one is a Bark in the Park concert on the 15th at Central Bark. Bring your pets for a fun day of music and activities!",
  "initiatives": "Our city is working on several pet-friendly initiatives, including more waste stations, expanded off-leash areas, and pet-friendly public transportation.",
  "rules": "Some basic rules for pet owners: always clean up after your pet, keep them leashed in designated areas, ensure they're vaccinated, and be respectful of others who might be afraid of animals.",
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm PawBuddy, your virtual assistant. How can I help you with pet-friendly city information today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    setTimeout(() => {
      let botReply = "I'm not sure how to answer that yet. Could you try asking about parks, restaurants, adoption, volunteering, events, or initiatives?";
      
      const lowercaseInput = input.toLowerCase();
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (lowercaseInput.includes(keyword)) {
          botReply = response;
          break;
        }
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce"
          aria-label="Open chat with PawBuddy"
        >
          <Paw className="h-6 w-6" />
        </button>
      )}
      
      {isOpen && (
        <div
          className={cn(
            "fixed z-50 transition-all duration-300 shadow-xl rounded-lg overflow-hidden chatbot-window",
            isMinimized ? "bottom-6 right-6 w-auto h-auto" : "bottom-6 right-6"
          )}
        >
          <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
            {isMinimized ? (
              <Button
                onClick={() => setIsMinimized(false)}
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary/80 p-2"
              >
                <Paw className="h-5 w-5 mr-2" />
                <span>Chat with PawBuddy</span>
              </Button>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-primary-foreground">
                    <Paw className="h-5 w-5 text-primary" />
                  </Avatar>
                  <div>
                    <p className="font-medium">PawBuddy</p>
                    <Badge variant="outline" className="text-xs bg-primary-foreground/20 text-primary-foreground">
                      AI Assistant
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    onClick={() => setIsMinimized(true)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary/80"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary/80"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
          
          {!isMinimized && (
            <>
              <ScrollArea className="bg-card h-[calc(100%-120px)] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3 animate-in slide-in-from-bottom-2",
                          message.sender === 'user'
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted rounded-tl-none"
                        )}
                      >
                        <p>{message.text}</p>
                        <div
                          className={cn(
                            "text-xs mt-1",
                            message.sender === 'user' ? "text-primary-foreground/70" : "text-muted-foreground"
                          )}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="bg-card p-4 border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask PawBuddy a question..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}