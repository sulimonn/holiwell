import { apiSlice } from './apiSlice';

const courses = apiSlice.injectEndpoints({
  tagTypes: ['Courses'],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => '/courses/all',
    }),
    getCourse: builder.query({
      query: (id) => `/courses/${id}`,
    }),
    getLesson: builder.query({
      query: (id) => `/lessons/${id}`,
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery, useGetLessonQuery } = courses;

export default courses;
