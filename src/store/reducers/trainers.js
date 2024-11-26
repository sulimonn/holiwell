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
    getSliders: builder.query({
      query: () => '/sliders/all',
      providesTags: ['Sliders'],
    }),
    getSlider: builder.query({
      query: (id) => `/sliders/${id}`,
      providesTags: ['Sliders'],
    }),
    getInfo: builder.query({
      query: () => `/sliders/main?slider_id=1`,
      providesTags: ['Trainers'],
    }),
  }),
});

export const {
  useGetTrainersQuery,
  useGetTrainerQuery,
  useGetSlidersQuery,
  useGetInfoQuery,
  useGetSliderQuery,
} = trainers;

export default trainers;
