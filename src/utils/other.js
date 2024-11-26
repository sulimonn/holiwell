export function typeOfLesson(lesson) {
  if (lesson.course_type_slug === 'listening') return 'Аудио-курс';
  if (lesson.course_type_slug === 'training') return 'Тренировка';
  return 'Курс медитаций';
}

export function checkMediaType(url) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'webm', 'mkv'];

  const extension = url.split('.').pop().toLowerCase();

  if (imageExtensions.includes(extension)) {
    return 'image';
  } else if (videoExtensions.includes(extension)) {
    return 'video';
  } else {
    return 'unknown';
  }
}

export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);

  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
