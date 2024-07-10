import { apiSlice } from './apiSlice';

const courses = apiSlice.injectEndpoints({
  tagTypes: ['Courses'],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (sotrOption) => '/courses/all' + (sotrOption ? `?sort_by=${sotrOption}` : ''),
      providesTags: ['Courses'],
    }),
    getCourse: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: ['Courses'],
    }),
    getLesson: builder.query({
      query: (id) => `/lessons/${id}`,
      providesTags: ['Courses'],
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery, useGetLessonQuery } = courses;

export default courses;
