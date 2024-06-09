export function formatTime(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  return `${hours > 0 ? `${hours}:` : ''}${hours > 0 && minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export const formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h} ${h % 10 === 0 ? '' : h % 10 === 1 ? 'час' : h % 10 > 4 ? 'часов' : 'часa'} ${m.toString().padStart(2, '0')} ${m % 10 === 0 ? '' : m % 10 === 1 ? 'минута' : m % 10 > 4 ? 'минут' : 'минуты'}`;
};

export function formatDateToLocalISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
