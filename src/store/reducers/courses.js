import { apiSlice } from './apiSlice';

const courses = apiSlice.injectEndpoints({
  tagTypes: ['Courses'],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (sotrOption) => '/courses/all' + (sotrOption ? `?sort_by=${sotrOption}` : ''),
      providesTags: ['Courses'],
    }),
    getCourseByType: builder.query({
      query: (type) => `/courses/course-type/${type}`,
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

export const { useGetCoursesQuery, useGetCourseQuery, useGetLessonQuery, useGetCourseByTypeQuery } =
  courses;

export default courses;
