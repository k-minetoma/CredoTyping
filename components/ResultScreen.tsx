import React, { useState } from 'react';
import { Result } from '../types';
import Button from './ui/Button';
import { addRanking } from '../services/rankingService';



interface ResultScreenProps {
  result: Result;
  onShowRanking: () => void;
  onReturnToTitle: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onShowRanking, onReturnToTitle }) => {
  const [nickname, setNickname] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRegister = () => {
    
    if (nickname.trim() && !isSubmitted) {
      addRanking(nickname.trim(), result.score);
      setIsSubmitted(true);
      setTimeout(() => {
        onShowRanking();
      }, 500);
    }
  };

  const handleReturn = () => {
    
    onReturnToTitle();
  }

  const rankColor = {
    S: 'text-yellow-400',
    A: 'text-red-500',
    B: 'text-blue-400',
    C: 'text-gray-400',
  };

  return (
    <div className="w-full h-full bg-black bg-opacity-60 flex flex-col items-center justify-center p-12 text-center text-white">
      <h1 className="text-7xl font-bold mb-8">RESULT</h1>

      <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-12 text-3xl">
        <div className="text-right text-cyan-300">SCORE:</div>
        <div className="text-left font-bold">{result.score}</div>

        <div className="text-right text-cyan-300">RANK:</div>
        <div className={`text-left font-black text-5xl ${rankColor[result.rank]}`}>{result.rank}</div>

        <div className="text-right text-cyan-300">MAX COMBO:</div>
        <div className="text-left font-bold">{result.maxCombo}</div>
        
        <div className="text-right text-cyan-300">ACCURACY:</div>
        <div className="text-left font-bold">{result.accuracy.toFixed(2)}%</div>
      </div>

      <div className="w-full max-w-md mb-8">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="NICKNAME"
          maxLength={12}
          disabled={isSubmitted}
          className="w-full px-4 py-3 bg-transparent border-2 border-cyan-400 text-cyan-300 text-center text-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:opacity-50"
        />
        <p className="text-sm text-gray-400 mt-2">Enter a nickname to register your score.</p>
      </div>

      <div className="flex items-center space-x-6">
        <Button onClick={handleRegister} className={isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}>
          {isSubmitted ? '登録済み' : 'ランキング登録'}
        </Button>
        <Button onClick={handleReturn}>タイトルへ戻る</Button>
      </div>
    </div>
  );
};

export default ResultScreen;
