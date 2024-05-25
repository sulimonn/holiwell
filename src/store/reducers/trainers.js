import { apiSlice } from './apiSlice';

const trainers = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrainers: builder.query({
      query: () => '/trainers/all',
    }),
    getTrainer: builder.query({
      query: (id) => `/trainers/${id}`,
    }),
  }),
});

export const { useGetTrainersQuery, useGetTrainerQuery } = trainers;

export default trainers;
