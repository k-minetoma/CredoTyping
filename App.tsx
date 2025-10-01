import React, { useState, useCallback } from 'react';
import { GameState, Result } from './types';
import TitleScreen from './components/TitleScreen';
import StoryScreen from './components/StoryScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import RankingScreen from './components/RankingScreen';
import { STORY_DATA } from './constants/gameData';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('TITLE');
  const [result, setResult] = useState<Result | null>(null);

  const handleGameStart = useCallback(() => {
    setGameState('OPENING');
  }, []);

  const handleOpeningEnd = useCallback(() => {
    setGameState('PLAYING');
  }, []);

  const handleGameEnd = useCallback((finalResult: Result) => {
    setResult(finalResult);
    setGameState('ENDING');
  }, []);

  const handleEndingEnd = useCallback(() => {
    setGameState('RESULT');
  }, []);

  const handleShowRanking = useCallback(() => {
    setGameState('RANKING');
  }, []);
  
  const handleReturnToTitle = useCallback(() => {
    setResult(null);
    setGameState('TITLE');
  }, []);

  const renderScreen = () => {
    switch (gameState) {
      case 'TITLE':
        return <TitleScreen onGameStart={handleGameStart} onShowRanking={handleShowRanking} />;
      case 'OPENING':
        return <StoryScreen script={STORY_DATA.opening} onComplete={handleOpeningEnd} />;
      case 'PLAYING':
        return <GameScreen onGameEnd={handleGameEnd} />;
      case 'ENDING':
        const endingScript = STORY_DATA.ending[result?.rank || 'C'];
        return <StoryScreen script={endingScript} onComplete={handleEndingEnd} />;
      case 'RESULT':
        return result && <ResultScreen result={result} onShowRanking={handleShowRanking} onReturnToTitle={handleReturnToTitle} />;
      case 'RANKING':
        return <RankingScreen onReturnToTitle={handleReturnToTitle} />;
      default:
        return <TitleScreen onGameStart={handleGameStart} onShowRanking={handleShowRanking} />;
    }
  };

  return (
    <div className="w-full h-screen bg-cover bg-center text-white font-sans" style={{ backgroundImage: "url('/image/credo.jpg')" }}>
      <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="w-[1024px] h-[768px] relative overflow-hidden shadow-2xl shadow-cyan-400/20 border-2 border-cyan-400/50 rounded-lg">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
};

export default App;
