import { apiSlice } from './apiSlice';

const courses = apiSlice.injectEndpoints({
  tagTypes: ['Courses'],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (sotrOption) => '/courses/all' + (sotrOption ? `?sort_by=${sotrOption}` : ''),
      providesTags: ['Courses'],
    }),
    getCourseByType: builder.query({
      query: ({ type, sort_by }) => `/courses/course-type/${type}?sort_by=${sort_by || 'new'}`,
      providesTags: ['Courses'],
    }),
    getAllCourseTypes: builder.query({
      query: () => '/courses/course-type/all',
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
    getLessons: builder.query({
      query: ({ course_type, sort_by }) =>
        `/lessons/all?course_type_slug=${course_type}&sort_by=${sort_by}`,
      providesTags: ['Courses'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetLessonQuery,
  useGetCourseByTypeQuery,
  useGetLessonsQuery,
  useGetAllCourseTypesQuery,
} = courses;

export default courses;
