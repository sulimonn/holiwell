export const getAudioDuration = (audioUrl) => {
  return new Promise((resolve) => {
    const audio = new Audio(audioUrl);
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });
  });
};
