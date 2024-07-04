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
  }),
});

export const {
  useUpdateAvatarMutation,
  useGetMeQuery,
  useEditProfileMutation,
  useGetCalendarQuery,
} = user;

export default user;
