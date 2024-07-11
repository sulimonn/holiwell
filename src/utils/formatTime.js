export function formatTime(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  return `${hours > 0 ? `${hours}:` : ''}${hours > 0 && minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export const formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h === 0 ? '' : h} ${h % 10 === 0 ? '' : h % 10 === 1 ? 'час' : h % 10 > 4 ? 'часов' : 'часa'} ${m.toString().padStart(2, '0')} ${m % 10 === 0 ? '' : m % 10 === 1 ? 'минута' : m % 10 > 4 ? 'минут' : 'минуты'}`;
};

export function formatDateToLocalISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function timeToSeconds(time) {
  if (!time) return 0;
  const parts = time.split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);

  return hours * 3600 + minutes * 60 + seconds;
}
export const convertTime = (time) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);

  if (hours === 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export function addSeconds(secondsArray) {
  return secondsArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
}
