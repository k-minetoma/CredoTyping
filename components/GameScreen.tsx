import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CREEDS } from '../constants/gameData';
import { Result, Rank } from '../types';
import { playTypingSound, playBGM, stopBGM } from '../constants/assets';

interface GameScreenProps {
  onGameEnd: (result: Result) => void;
}

const QUESTION_TIME = 15;

const GameScreen: React.FC<GameScreenProps> = ({ onGameEnd }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [typedRomaji, setTypedRomaji] = useState('');
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctTypes, setCorrectTypes] = useState(0);
  const [missTypes, setMissTypes] = useState(0);

  const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const [interstitialState, setInterstitialState] = useState({
    visible: false,
    text: '',
    color: '',
  });
  const [inputState, setInputState] = useState<'idle' | 'correct' | 'error'>('idle');
  const [comboFlash, setComboFlash] = useState(0);

  const currentQuestion = useMemo(() => CREEDS[questionIndex], [questionIndex]);
  const romajiToType = useMemo(() => currentQuestion.romaji.replace(/\s/g, ''), [currentQuestion]);
  
  useEffect(() => {
    playBGM('game');
    return () => stopBGM();
  }, []);

  const getComboMultiplier = useCallback(() => {
    if (combo >= 30) return 2.0;
    if (combo >= 20) return 1.5;
    if (combo >= 10) return 1.2;
    return 1.0;
  }, [combo]);

  const advanceToNextPhase = useCallback(() => {
    if (questionIndex + 1 < CREEDS.length) {
      setQuestionIndex(prev => prev + 1);
      setTypedRomaji('');
      setTimeLeft(QUESTION_TIME);
      setInterstitialState({ visible: false, text: '', color: '' });
    } else {
      // Game End
      const totalTypes = correctTypes + missTypes;
      const accuracy = totalTypes > 0 ? (correctTypes / totalTypes) * 100 : 100;
      const finalScore = score + totalTimeLeft * 50;
      
      let rank: Rank = 'C';
      if (finalScore > 4000) rank = 'S';
      else if (finalScore > 3000) rank = 'A';
      else if (finalScore > 2000) rank = 'B';
      
      onGameEnd({ score: finalScore, rank, maxCombo, accuracy });
    }
  }, [questionIndex, score, maxCombo, correctTypes, missTypes, onGameEnd, totalTimeLeft]);

  // Create a ref to hold the latest advanceToNextPhase function to prevent stale closures.
  const advanceToNextPhaseRef = useRef(advanceToNextPhase);
  useEffect(() => {
    advanceToNextPhaseRef.current = advanceToNextPhase;
  }, [advanceToNextPhase]);

  const handleSuccess = useCallback(() => {
    setInterstitialState({ visible: true, text: 'CLEAR!', color: 'text-sky-500' });
  
    setTotalTimeLeft(prev => prev + timeLeft);
    setTimeout(() => advanceToNextPhaseRef.current(), 1500);
  }, [timeLeft]);

  const handleTimeout = useCallback(() => {
    setInterstitialState({ visible: true, text: 'FAILURE', color: 'text-red-500' });
  
    setCombo(0);
    setTimeout(() => advanceToNextPhaseRef.current(), 1500);
  }, []);

  useEffect(() => {
    if (interstitialState.visible) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionIndex, interstitialState.visible, handleTimeout]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (interstitialState.visible || !currentQuestion) return;
    if (e.key.length > 1) return;
     if (e.key === ' ' && romajiToType[typedRomaji.length] !== ' ') {
        e.preventDefault();
        return;
    }
    
    const expectedChar = romajiToType[typedRomaji.length];

    if (e.key.toLowerCase() === expectedChar) {
      playTypingSound();
      setInputState('correct');
      setTimeout(() => setInputState('idle'), 200);

      setTypedRomaji(prev => prev + e.key.toLowerCase());
      setScore(prev => prev + (10 * getComboMultiplier()));
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) {
        setMaxCombo(newCombo);
      }
      setCorrectTypes(prev => prev + 1);

      if (newCombo === 10 || newCombo === 20 || newCombo === 30) {
        setComboFlash(newCombo);
        setTimeout(() => setComboFlash(0), 700);
      }

      if (typedRomaji.length + 1 === romajiToType.length) {
        handleSuccess();
      }
    } else {
      
      setInputState('error');
      setTimeout(() => setInputState('idle'), 200);

      setScore(prev => Math.max(0, prev - 5));
      setCombo(0);
      setMissTypes(prev => prev + 1);
    }
  }, [interstitialState.visible, currentQuestion, romajiToType, typedRomaji, getComboMultiplier, combo, maxCombo, handleSuccess]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderRomaji = () => {
    let spaceCounter = 0;
    return currentQuestion.romaji.split('').map((char, index) => {
      if (char === ' ') {
        spaceCounter++;
        return <span key={index} className="mx-2"></span>;
      }
      const romajiIndex = index - spaceCounter;
      let colorClass = 'text-gray-400';
      if (romajiIndex < typedRomaji.length) {
        colorClass = 'text-sky-500 font-bold';
      }
      return <span key={index} className={`transition-colors duration-100 ${colorClass}`}>{char}</span>;
    });
  };

  const inputStateClasses = {
    idle: 'border-sky-200',
    correct: 'border-green-400',
    error: 'border-red-500',
  };

  const comboFlashClasses: {[key: number]: string} = {
      10: 'combo-flash-10',
      20: 'combo-flash-20',
      30: 'combo-flash-30',
  };

  const timeBarColor = timeLeft > 5 ? 'bg-sky-400' : 'bg-red-500';

  return (
    <div className={`w-full h-full animated-gradient flex flex-col items-center justify-center p-8 text-gray-800 select-none relative overflow-hidden font-['M_PLUS_Rounded_1c'] ${comboFlashClasses[comboFlash] || ''}`}>
      {interstitialState.visible && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-20">
          <h1 className={`text-9xl font-black animate-clear-effect ${interstitialState.color}`}>
            {interstitialState.text}
          </h1>
        </div>
      )}

      <div className="absolute top-8 left-8 right-8">
        <div className="w-full bg-gray-200/80 rounded-full h-4 shadow-inner">
            <div className={`h-4 rounded-full transition-all duration-1000 linear ${timeBarColor}`} style={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}></div>
        </div>
      </div>

      <div className="w-full text-center flex-grow flex items-center justify-center flex-col">
        <h2 className="text-6xl font-black text-gray-700 drop-shadow-sm mb-4">{currentQuestion?.japanese}</h2>
        <div className={`bg-white/80 backdrop-blur-sm border-4 rounded-lg p-6 w-full max-w-4xl text-4xl font-mono tracking-widest text-center shadow-lg transition-colors duration-200 ${inputStateClasses[inputState]}`}>
            {renderRomaji()}
        </div>
      </div>


      <div className="w-full max-w-4xl grid grid-cols-3 gap-8 text-4xl flex-shrink-0">
        <div className="text-center bg-white/50 p-4 rounded-lg shadow-md">
          <p className="text-sky-600 text-2xl mb-2 font-bold">SCORE</p>
          <p className="font-black text-5xl">{Math.round(score)}</p>
        </div>
        <div className="text-center bg-white/50 p-4 rounded-lg shadow-md">
          <p className="text-sky-600 text-2xl mb-2 font-bold">TIME</p>
          <p className={`font-black text-5xl transition-colors ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : ''}`}>{timeLeft}</p>
        </div>
        <div className="text-center bg-white/50 p-4 rounded-lg shadow-md">
          <p className="text-sky-600 text-2xl mb-2 font-bold">COMBO</p>
          <p className="font-black text-5xl">{combo}</p>
        </div>
      </div>

      {combo >= 10 && (
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] text-9xl font-black text-sky-300/60 -z-10"
         style={{ textShadow: '0px 0px 15px rgba(0, 191, 255, 0.5)'}}>
            COMBO <span className="text-sky-400/80">x{getComboMultiplier().toFixed(1)}</span>
        </div>
      )}
    </div>
  );
};

export default GameScreen;