import { apiSlice } from './apiSlice';

const courses = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => '/courses',
    }),
  }),
});

export const { useGetCoursesQuery } = courses;

export default courses;
