import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  reducerPath: 'authApi',

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
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { ...credentials },
      }),
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

export const login = async (credentials) => {
  const formData = new URLSearchParams();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);
  // const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/jwt/login', formData, {
  //   withCredentials: true,
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     Accept: '*/*',
  //   },
  // });
  const response = await fetch(process.env.REACT_APP_API_URL + '/auth/jwt/login', {
    method: 'POST',
    credentials: 'include',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    },
  });
  return response;
};
