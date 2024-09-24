import { apiSlice } from './apiSlice';

const trainers = apiSlice.injectEndpoints({
  tagTypes: ['Trainers', 'Sliders'],
  endpoints: (builder) => ({
    getTrainers: builder.query({
      query: () => '/trainers/all',
      providesTags: ['Trainers'],
    }),
    getTrainer: builder.query({
      query: (id) => `/trainers/${id}`,
      providesTags: ['Trainers'],
    }),
    getSlider: builder.query({
      query: () => '/sliders/all',
      providesTags: ['Sliders'],
    }),
    getInfo: builder.query({
      query: () => `/sliders/main?slider_id=1`,
      providesTags: ['Trainers'],
    }),
  }),
});

export const { useGetTrainersQuery, useGetTrainerQuery, useGetSliderQuery, useGetInfoQuery } =
  trainers;

export default trainers;
