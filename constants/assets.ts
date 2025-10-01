// These are dummy functions. In a real project, you would implement audio playback here.
// For example, using the Web Audio API or a library like Howler.js.


export const playTypingSound = () => {
  const audio = new Audio('/music/key.mp3');
  audio.play();
};

// export const playMissSound = () => {
//   const audio = new Audio('/music/miss.mp3');
//   audio.play();
// };

// export const playConfirmSound = () => {
//   const audio = new Audio('/music/confirm.mp3');
//   audio.play();
// };

// export const playClearSound = () => {
//   const audio = new Audio('/music/clear.mp3');
//   audio.play();
// };

export const playBGM = (track: 'title' | 'story' | 'game') => {
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
  const bgm = new Audio(src);
  bgm.loop = true;
  bgm.play();
};

export const stopBGM = () => {
  console.log("BGM Stop");
};

