import React, { useEffect } from 'react';
import Button from './ui/Button';
import { playBGM, stopBGM } from '../constants/assets';

interface TitleScreenProps {
  onGameStart: () => void;
  onShowRanking: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onGameStart, onShowRanking }) => {
  useEffect(() => {
    playBGM('title');
    return () => stopBGM();
  }, []);

  const handleStart = () => {
    
    onGameStart();
  };

  const handleRanking = () => {
    
    onShowRanking();
  };
  
  const handleExit = () => {
    
    // In a real web app, we might just navigate away or close a modal.
    // For this environment, we can just log it.
    console.log("Exit game");
  };

  const linkButtonClasses = `
    px-12 py-4 bg-cyan-400 text-gray-900 font-bold text-xl 
    border-2 border-cyan-400 rounded-full
    hover:bg-transparent hover:text-cyan-400
    transition-all duration-300 ease-in-out
    shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-400/50
    transform hover:scale-105
  `;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-black bg-opacity-40">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-8xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,255,255,0.7)]"
            style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}>
          クレド爆誕
        </h1>
        <p className="text-2xl text-cyan-300 mt-2">Kredo Bakutan</p>
      </div>
      <div className="flex flex-col items-center space-y-6">
        <Button onClick={handleStart}>ゲーム開始</Button>
        <Button onClick={handleRanking}>スコア確認</Button>
        <a 
            href="https://www.ankusu.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={linkButtonClasses}
            
        >
            アンクスHPへ
        </a>
        <Button onClick={handleExit}>終了</Button>
      </div>
    </div>
  );
};

export default TitleScreen;