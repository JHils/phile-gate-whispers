
import React, { useState, useEffect, useRef } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useJonahChat } from '@/hooks/useJonahChat';
import JonahChatHeader from '@/components/jonahChat/JonahChatHeader';
import JonahChatInput from '@/components/jonahChat/JonahChatInput';
import JonahChatMessages from '@/components/jonahChat/JonahChatMessages';
import JonahEmotionalIndicators from '@/components/jonahChat/JonahEmotionalIndicators';

// Import types
import { EmotionCategory, EmotionalTrend } from '@/utils/jonahAdvancedBehavior/types';

const TalkToJonah: React.FC = () => {
  const {
    messages,
    input,
    setInput,
    isTyping,
    jonahMood,
    jonahVersion,
    messageWeight,
    conversationDepth,
    emotionalTrend,
    responseStyle,
    handleSendMessage,
    toggleVersion,
    resetConversation
  } = useJonahChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 flex flex-col">
      <JonahChatHeader 
        jonahMood={jonahMood} 
        emotionalTrend={emotionalTrend} 
        conversationDepth={conversationDepth}
        jonahVersion={jonahVersion}
        toggleVersion={toggleVersion}
        resetConversation={resetConversation}
      />
      
      <JonahChatMessages 
        messages={messages}
        isTyping={isTyping}
        messageWeight={messageWeight}
        responseStyle={responseStyle}
        messagesEndRef={messagesEndRef}
      />
      
      <JonahChatInput
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default TalkToJonah;
