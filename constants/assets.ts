// These are dummy functions. In a real project, you would implement audio playback here.
// For example, using the Web Audio API or a library like Howler.js.


export const playTypingSound = () => {
  const audio = new Audio('/music/key.mp3');
  audio.play();
};

let currentBGM: HTMLAudioElement | null = null;

export const playBGM = (track: 'title' | 'story' | 'game') => {
  // まず前のBGMを止める
  if (currentBGM) {
    currentBGM.pause();
    currentBGM.currentTime = 0;
  }

  let src = '';
  switch (track) {
    case 'title':
      src = '/music/opning.mp3';
      break;
    case 'story':
      src = '/music/office.mp3';
      break;
    case 'game':
      src = '/music/game.mp3';
      break;
  }

  currentBGM = new Audio(src);
  currentBGM.loop = true;
  currentBGM.play();
};

export const stopBGM = () => {
  if (currentBGM) {
    currentBGM.pause();
    currentBGM.currentTime = 0;
    currentBGM = null;
  }
};

