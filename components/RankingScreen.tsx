import React, { useState, useEffect } from 'react';
import { getRankings } from '../services/rankingService';
import { ScoreEntry } from '../types';
import Button from './ui/Button';


interface RankingScreenProps {
  onReturnToTitle: () => void;
}

const RankingScreen: React.FC<RankingScreenProps> = ({ onReturnToTitle }) => {
  const [rankings, setRankings] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    setRankings(getRankings());
  }, []);
  
  const handleReturn = () => {
   
    onReturnToTitle();
  }

  return (
    <div className="w-full h-full bg-black bg-opacity-60 flex flex-col items-center p-8 text-white">
      <h1 className="text-6xl font-bold mb-6 text-cyan-300 drop-shadow-lg">HIGH SCORES</h1>
      <div className="w-full max-w-2xl flex-grow overflow-y-auto bg-black bg-opacity-50 border-2 border-cyan-400/50 p-4 rounded-lg">
        <table className="w-full text-xl">
          <thead>
            <tr className="border-b-2 border-cyan-400">
              <th className="p-3 text-left w-1/6">RANK</th>
              <th className="p-3 text-left w-3/6">NAME</th>
              <th className="p-3 text-right w-2/6">SCORE</th>
            </tr>
          </thead>
          <tbody>
            {rankings.length > 0 ? (
              rankings.map((entry, index) => (
                <tr key={index} className="border-b border-gray-700 last:border-b-0 hover:bg-cyan-900/50">
                  <td className="p-3 font-bold">{index + 1}</td>
                  <td className="p-3">{entry.name}</td>
                  <td className="p-3 text-right font-mono">{entry.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-8 text-gray-400">No scores yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <Button onClick={handleReturn}>戻る</Button>
      </div>
    </div>
  );
};

export default RankingScreen;
