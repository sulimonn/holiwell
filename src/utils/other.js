export function typeOfLesson(lesson) {
  if (lesson.course_type_slug === 'listening') return 'Аудио-курс';
  if (lesson.course_type_slug === 'training') return 'Тренировка';
  return 'Курс медитаций';
}
