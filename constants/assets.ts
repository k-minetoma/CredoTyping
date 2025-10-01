let bgmAudio: HTMLAudioElement | null = null;

export const playTypingSound = () => {
  const audio = new Audio('/music/key.mp3');
  audio.play();
};

export const playBGM = (track: 'title' | 'story' | 'game') => {
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
  bgmAudio.play().catch(() => {
    console.log('Autoplay blocked, user interaction required');
  });
};

export const stopBGM = () => {
  if (bgmAudio) {
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
    bgmAudio = null;
  }
};
