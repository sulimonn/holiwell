import { apiSlice } from './apiSlice';

const trainers = apiSlice.injectEndpoints({
  tagTypes: ['Trainers'],
  endpoints: (builder) => ({
    getTrainers: builder.query({
      query: () => '/trainers/all',
      providesTags: ['Trainers'],
    }),
    getTrainer: builder.query({
      query: (id) => `/trainers/${id}`,
      providesTags: ['Trainers'],
    }),
  }),
});

export const { useGetTrainersQuery, useGetTrainerQuery } = trainers;

export default trainers;
