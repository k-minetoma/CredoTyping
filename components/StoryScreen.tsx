import React, { useState, useEffect, useCallback } from 'react';
import { Dialogue, CHARACTER_DATA } from '../types';
import { playBGM, stopBGM } from '../constants/assets';

interface StoryScreenProps {
  script: Dialogue[];
  onComplete: () => void;
}

const StoryScreen: React.FC<StoryScreenProps> = ({ script, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    playBGM('story');
    return () => stopBGM();
  }, []);

  const nextDialogue = useCallback(() => {
    
    if (currentIndex < script.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  }, [currentIndex, script.length, onComplete]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        nextDialogue();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [nextDialogue]);

  const currentLine = script[currentIndex];
  const characterInfo = CHARACTER_DATA[currentLine.character];
  
  const isPresidentSpeaking = currentLine.character === '社長';

  return (
    <div 
      className="w-full h-full bg-cover bg-center flex flex-col justify-end" 
      style={{ backgroundImage: "url('/image/office.jpg')" }}
      onClick={nextDialogue}
    >
       <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center p-16 pointer-events-none">
        {/* New Employee Character */}
        <div className={`transition-all duration-500 ease-out transform ${isPresidentSpeaking ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`} style={{ marginRight: '-100px'}}>
            <img src={CHARACTER_DATA['あなた'].image} alt={CHARACTER_DATA['あなた'].name} className="h-[80vh] max-h-[600px] object-contain drop-shadow-lg" />
        </div>
        {/* President Character */}
        <div className={`transition-all duration-500 ease-out transform ${isPresidentSpeaking ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ marginLeft: '-100px'}}>
            <img src={CHARACTER_DATA['社長'].image} alt={CHARACTER_DATA['社長'].name} className="h-[80vh] max-h-[600px] object-contain drop-shadow-lg" />
        </div>
      </div>
      
      <div className="relative m-4 p-6 bg-black bg-opacity-80 border-2 border-cyan-400 rounded-xl shadow-lg shadow-cyan-500/30">
        <div className="absolute -top-6 left-8 px-4 py-1 bg-cyan-500 text-gray-900 font-bold text-lg rounded-t-lg">
          {characterInfo.name}
        </div>
        <p className="text-white text-2xl leading-relaxed whitespace-pre-wrap">{currentLine.text}</p>
        <div className="absolute bottom-2 right-4 text-cyan-300 animate-pulse text-sm">
          ▼ Click or Press Enter
        </div>
      </div>
    </div>
  );
};

export default StoryScreen;
