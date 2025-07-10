
import React from 'react';
import { useJonahChat } from '@/hooks/useJonahChat';
import JonahChatContainer from '@/components/jonahChat/JonahChatContainer';
import JonahChatInterface from '@/components/jonahChat/JonahChatInterface';
import OSPageTemplate from '@/components/fracturedOS/OSPageTemplate';
import MoodPoll from '@/components/fracturedOS/MoodPoll';
import ConsoleMemorySystem from '@/components/fracturedOS/ConsoleMemorySystem';

const TalkToJonah: React.FC = () => {
  const {
    messages,
    input,
    setInput,
    isTyping,
    jonahMood,
    emotionalTrend,
    responseStyle,
    handleSendMessage,
    messageWeight,
    jonahVersion,
    conversationDepth,
    toggleVersion,
    resetConversation
  } = useJonahChat();
  
  return (
    <OSPageTemplate 
      title="ECHO_CHAMBER.exe"
      subtitle="Direct Neural Interface Active"
      breadcrumb="GATE > NEURAL INTERFACE > ECHO CHAMBER"
    >
      <ConsoleMemorySystem />
      
      <div className="mb-6 bg-black/40 border border-green-500/30 rounded-lg p-4">
        <div className="text-green-400 font-mono text-sm mb-2">
          ⚡ CONSOLE TIP: Try typing whisperToJonah("your message") in the browser console
        </div>
        <div className="text-green-400/60 font-mono text-xs">
          Advanced users: rememberMe() | forgetEverything() | iAmJonah()
        </div>
      </div>
      
      <JonahChatContainer>
        <JonahChatInterface 
          messages={messages}
          input={input}
          setInput={setInput}
          isTyping={isTyping}
          jonahMood={jonahMood}
          jonahVersion={jonahVersion}
          messageWeight={messageWeight}
          conversationDepth={conversationDepth}
          emotionalTrend={emotionalTrend}
          responseStyle={responseStyle}
          handleSendMessage={handleSendMessage}
          toggleVersion={toggleVersion}
          resetConversation={resetConversation}
        />
      </JonahChatContainer>
      
      <MoodPoll 
        pageContext="talk-to-jonah"
        onMoodSelect={(mood) => {
          console.log(`%cMood logged: ${mood} - The mirror takes note.`, 'color: #22c55e; font-style: italic;');
        }}
      />
    </OSPageTemplate>
  );
};

export default TalkToJonah;
