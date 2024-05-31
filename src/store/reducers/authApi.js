import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  reducerPath: 'authApi',

  tagTypes: ['User'],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        const formData = new URLSearchParams();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        return {
          url: '/auth/jwt/login',
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },
        };
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['User'],
    }),
    getMe: builder.query({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/jwt/logout',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export default authApi;

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
  useResetPasswordMutation,
} = authApi;
