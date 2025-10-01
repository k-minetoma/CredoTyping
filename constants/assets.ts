// assets.ts
let bgmAudio: HTMLAudioElement | null = null;
let userInteracted = false;

export const initBGM = (track: 'title' | 'story' | 'game') => {
  const startBGM = () => {
    userInteracted = true;
    playBGM(track);
    window.removeEventListener('click', startBGM);
    window.removeEventListener('keydown', startBGM);
  };

  window.addEventListener('click', startBGM);
  window.addEventListener('keydown', startBGM);
};

export const playBGM = (track: 'title' | 'story' | 'game') => {
  if (!userInteracted) return; // ユーザー操作前は再生しない

  let src = '';
  switch (track) {
    case 'title': src = '/music/opning.mp3'; break;
    case 'story': src = '/music/office.mp3'; break;
    case 'game': src = '/music/game.mp3'; break;
  }

  if (bgmAudio) {
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
  }

  bgmAudio = new Audio(src);
  bgmAudio.loop = true;
  bgmAudio.play().catch(() => console.log('Autoplay blocked'));
};

export const stopBGM = () => {
  if (bgmAudio) {
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
    bgmAudio = null;
  }
};
