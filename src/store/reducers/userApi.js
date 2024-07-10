import { apiSlice } from './apiSlice';

const user = apiSlice.injectEndpoints({
  tagTypes: ['User'],
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (formData) => ({
        url: '/users/update-avatar',
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    getMe: builder.query({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: '/users/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getCalendar: builder.query({
      query: () => '/users/my-calendar',
      providesTags: ['User'],
    }),
    planLesson: builder.mutation({
      query: (data) => ({
        url: '/users/plan-lesson',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    likeLesson: builder.mutation({
      query: (data) => ({
        url: '/users/like-lesson',
        method: 'POST',
        body: data,
      }),
    }),
    unlikeLesson: builder.mutation({
      query: (data) => ({
        url: '/users/like-lesson',
        method: 'DELETE',
        body: data,
      }),
    }),
    getFavourites: builder.query({
      query: () => '/users/my-favorite',
      providesTags: ['User'],
    }),
    watchLesson: builder.mutation({
      query: (data) => ({
        url: '/users/watch-lesson',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    myViewed: builder.query({
      query: () => '/users/my-viewed',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useGetMeQuery,
  useEditProfileMutation,
  useGetCalendarQuery,
  usePlanLessonMutation,
  useLikeLessonMutation,
  useUnlikeLessonMutation,
  useGetFavouritesQuery,
  useWatchLessonMutation,
  useMyViewedQuery,
} = user;

export default user;
