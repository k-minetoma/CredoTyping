import React, { useEffect } from 'react';
import Button from './ui/Button';
import { initBGM, stopBGM } from '../constants/assets';

interface TitleScreenProps {
  onGameStart: () => void;
  onShowRanking: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onGameStart, onShowRanking }) => {
  // タイトルBGM再生
  useEffect(() => {
    initBGM('title'); // ユーザー操作まで待機
    return () => stopBGM(); // 画面切り替え時に停止
  }, []);

  const handleStart = () => onGameStart();
  const handleRanking = () => onShowRanking();
  const handleExit = () => console.log("Exit game");

  const linkButtonClasses = `
    px-12 py-4 bg-cyan-400 text-gray-900 font-bold text-xl 
    border-2 border-cyan-400 rounded-full
    hover:bg-transparent hover:text-cyan-400
    transition-all duration-300 ease-in-out
    shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-400/50
    transform hover:scale-105
  `;

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/image/credo.jpg')" }}
    >
      <div className="w-full h-full bg-black bg-opacity-40 flex flex-col items-center justify-center">
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <h1 className="text-8xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,255,255,0.7)]"
              style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}>
            クレド爆誕
          </h1>
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
    </div>
  );
};

export default TitleScreen;
