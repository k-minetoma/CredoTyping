export type GameState = 'TITLE' | 'OPENING' | 'PLAYING' | 'ENDING' | 'RESULT' | 'RANKING';

export interface Question {
  japanese: string;
  romaji: string;
}

export interface Dialogue {
  character: keyof typeof CHARACTER_DATA;
  text: string;
}

export type Rank = 'S' | 'A' | 'B' | 'C';

export interface Result {
  score: number;
  rank: Rank;
  maxCombo: number;
  accuracy: number;
}

export interface ScoreEntry {
  name: string;
  score: number;
}

export const CHARACTER_DATA = {
    'あなた': {
        name: '新入社員',
        image: 'https://picsum.photos/seed/shinnyu/400/600',
    },
    '社長': {
        name: '社長',
        image: 'https://picsum.photos/seed/shacho/400/600',
    }
};
