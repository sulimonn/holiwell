import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  team: [
    {
      id: 1,
      first_name: 'Имя',
      last_name: 'Фамилия',
      avatar: 'avatar-1.png',
      slogan: '',
    },
    {
      id: 2,
      first_name: 'Имя',
      last_name: 'Фамилия',
      avatar: 'avatar-2.png',
      slogan: '',
    },
    {
      id: 3,
      first_name: 'Имя',
      last_name: 'Фамилия',
      avatar: 'avatar-1.png',
      slogan: '',
    },
    {
      id: 4,
      first_name: 'Имя',
      last_name: 'Фамилия',
      avatar: 'avatar-2.png',
      slogan: '',
    },
  ],
};

const team = createSlice({
  name: 'team',
  initialState,
  reducers: {},
});

export default team.reducer;
