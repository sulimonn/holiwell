import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trainers: [
    {
      id: 1,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-1.png',
      slogan: '',
    },
    {
      id: 2,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-2.png',
      slogan: '',
    },
    {
      id: 3,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-1.png',
      slogan: '',
    },
    {
      id: 4,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-2.png',
      slogan: '',
    },

    {
      id: 5,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-1.png',
      slogan: '',
    },
    {
      id: 6,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-2.png',
      slogan: '',
    },
    {
      id: 7,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-1.png',
      slogan: '',
    },
    {
      id: 8,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-2.png',
      slogan: '',
    },
  ],
  training: [
    {
      id: 0,
      title: 'Тренировки для тела',
      description: 'string',
      path_to_cover: 'courses2.jpeg',
    },
    {
      id: 1,
      title: 'Выдающийся рельеф',
      description: '',
      path_to_cover: 'lesson.jpeg',
    },
    {
      id: 2,
      title: 'Тренировки для тела',
      description: 'string',
      path_to_cover: 'courses2.jpeg',
    },
    {
      id: 3,
      title: 'Выдающийся рельеф',
      description: 'string',
      path_to_cover: 'lesson.jpeg',
    },
  ],
  listen: {
    id: 0,
    title: 'название курса',
    description:
      'Откройте для себя преимущества регулярной медитации на нашем курсе, направленном на улучшение физического и эмоционального благополучия.',
    path_to_cover: 'listening.jpeg',
    lessons: [
      {
        id: 0,
        title: 'Урок 1 : Название аудио',
        description:
          'Не ограничивай себя в движении.\n\n В здоровом теле здоровый дух. Регулярная практика и позитивный настрой дадут тебе энергию для реализации твоих целей.',
        trainer: {
          id: 0,
          first_name: 'Имя',
          last_name: 'Фамилия',
          description:
            'Откройте для себя преимущества регулярной медитации на нашем уроке, направленной на улучшение физического и эмоционального благополучия.',
          path_to_avatar: 'avatar-1.png',
          path_to_background: 'background-1.jpeg',
        },
        course_id: 0,
        path_to_cover: 'lesson.jpeg',
        path_to_video: 'string',
        path_to_audio:
          'https://muzma.net/uploads/music/2023/01/Darkvidez_The_Hills_x_The_Color_Violet_x_Creepin_Tiktok_Remix.mp3',
        links_before: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
        links_after: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
      },
      {
        id: 2,
        title: 'Урок 2 : Название аудио',
        description:
          'Не ограничивай себя в движении.\n\n В здоровом теле здоровый дух. Регулярная практика и позитивный настрой дадут тебе энергию для реализации твоих целей.',
        trainer: {
          id: 0,
          first_name: 'Имя',
          last_name: 'Фамилия',
          description:
            'Откройте для себя преимущества регулярной медитации на нашем уроке, направленной на улучшение физического и эмоционального благополучия.',
          path_to_avatar: 'avatar-1.png',
          path_to_background: 'background-1.jpeg',
        },
        course_id: 0,
        path_to_cover: 'courses2.jpeg',
        path_to_video: 'string',
        path_to_audio: 'https://mp3uk.net/mp3/files/rihanna-diamonds-mp3.mp3',
        links_before: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
        links_after: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
      },
      {
        id: 3,
        title: 'Урок 3 : Название аудио',
        description:
          'Не ограничивай себя в движении.\n\n В здоровом теле здоровый дух. Регулярная практика и позитивный настрой дадут тебе энергию для реализации твоих целей.',
        trainer: {
          id: 0,
          first_name: 'Имя',
          last_name: 'Фамилия',
          description:
            'Откройте для себя преимущества регулярной медитации на нашем уроке, направленной на улучшение физического и эмоционального благополучия.',
          path_to_avatar: 'avatar-1.png',
          path_to_background: 'background-1.jpeg',
        },
        course_id: 0,
        path_to_cover: 'lesson.jpeg',
        path_to_video: 'string',
        path_to_audio:
          'https://mp3uk.net/mp3/files/nicholas-bonnin-angelicca-shut-up-and-listen-mp3.mp3',
        links_before: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
        links_after: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
      },
      {
        id: 4,
        title: 'Урок 4 : Название аудио',
        description:
          'Не ограничивай себя в движении.\n\n В здоровом теле здоровый дух. Регулярная практика и позитивный настрой дадут тебе энергию для реализации твоих целей.',
        trainer: {
          id: 0,
          first_name: 'Имя',
          last_name: 'Фамилия',
          description:
            'Откройте для себя преимущества регулярной медитации на нашем уроке, направленной на улучшение физического и эмоционального благополучия.',
          path_to_avatar: 'avatar-1.png',
          path_to_background: 'background-1.jpeg',
        },
        course_id: 0,
        path_to_cover: 'courses2.jpeg',
        path_to_video:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        path_to_audio: 'https://mp3uk.net/mp3/files/lana-del-rey-young-and-beautiful-mp3.mp3',
        links_before: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
        links_after: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
      },
    ],
  },
  meditation: {
    id: 0,
    title: 'название курса',
    description:
      'Откройте для себя преимущества регулярной медитации на нашем курсе, направленном на улучшение физического и эмоционального благополучия. Вы разовьете навыки внимательности и научитесь управлять своим внутренним состоянием для достижения гармонии и равновесия.',
    path_to_cover: 'intro.jpeg',
    lessons: [
      {
        id: 0,
        title: 'Медитация 1',
        description:
          'Не ограничивай себя в движении.\n\n В здоровом теле здоровый дух. Регулярная практика и позитивный настрой дадут тебе энергию для реализации твоих целей.',
        trainer: {
          id: 0,
          first_name: 'Имя',
          last_name: 'Фамилия',
          description:
            'Откройте для себя преимущества регулярной медитации на нашем уроке, направленной на улучшение физического и эмоционального благополучия.',
          path_to_avatar: 'avatar-1.png',
          path_to_background: 'background-1.jpeg',
        },
        course_id: 0,
        path_to_cover: 'lesson.jpeg',
        path_to_video:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        path_to_audio:
          'https://muzma.net/uploads/music/2023/01/Darkvidez_The_Hills_x_The_Color_Violet_x_Creepin_Tiktok_Remix.mp3',
        links_before: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
        links_after: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
      },
      {
        id: 2,
        title: 'Медитация 2',
        description:
          'Не ограничивай себя в движении.\n\n В здоровом теле здоровый дух. Регулярная практика и позитивный настрой дадут тебе энергию для реализации твоих целей.',
        trainer: {
          id: 0,
          first_name: 'Имя',
          last_name: 'Фамилия',
          description:
            'Откройте для себя преимущества регулярной медитации на нашем уроке, направленной на улучшение физического и эмоционального благополучия.',
          path_to_avatar: 'avatar-1.png',
          path_to_background: 'background-1.jpeg',
        },
        course_id: 0,
        path_to_cover: 'courses2.jpeg',
        path_to_video:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        path_to_audio:
          'https://muzma.net/uploads/music/2023/01/Darkvidez_The_Hills_x_The_Color_Violet_x_Creepin_Tiktok_Remix.mp3',
        links_before: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
        links_after: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
      },
      {
        id: 3,
        title: 'Медитация 3',
        description:
          'Не ограничивай себя в движении.\n\n В здоровом теле здоровый дух. Регулярная практика и позитивный настрой дадут тебе энергию для реализации твоих целей.',
        trainer: {
          id: 0,
          first_name: 'Имя',
          last_name: 'Фамилия',
          description:
            'Откройте для себя преимущества регулярной медитации на нашем уроке, направленной на улучшение физического и эмоционального благополучия.',
          path_to_avatar: 'avatar-1.png',
          path_to_background: 'background-1.jpeg',
        },
        course_id: 0,
        path_to_cover: 'lesson.jpeg',
        path_to_video:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        path_to_audio:
          'https://muzma.net/uploads/music/2023/01/Darkvidez_The_Hills_x_The_Color_Violet_x_Creepin_Tiktok_Remix.mp3',
        links_before: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
        links_after: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
      },
      {
        id: 4,
        title: 'Медитация 4',
        description:
          'Не ограничивай себя в движении.\n\n В здоровом теле здоровый дух. Регулярная практика и позитивный настрой дадут тебе энергию для реализации твоих целей.',
        trainer: {
          id: 0,
          first_name: 'Имя',
          last_name: 'Фамилия',
          description:
            'Откройте для себя преимущества регулярной медитации на нашем уроке, направленной на улучшение физического и эмоционального благополучия.',
          path_to_avatar: 'avatar-1.png',
          path_to_background: 'background-1.jpeg',
        },
        course_id: 0,
        path_to_cover: 'courses2.jpeg',
        path_to_video:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        path_to_audio:
          'https://muzma.net/uploads/music/2023/01/Darkvidez_The_Hills_x_The_Color_Violet_x_Creepin_Tiktok_Remix.mp3',
        links_before: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
        links_after: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
      },
    ],
  },
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
});
export default testSlice.reducer;
