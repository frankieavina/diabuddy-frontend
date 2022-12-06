import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const setProfileImage = (pic) => {
  const imageProfile = pic;
}

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  reducerPath: 'signIn',
  endpoints: (build) => ({
 
    ////////////////user logging in////////////////////
    userLogIn: build.mutation({
      query: (payload) =>({
        url:`api/auth/signin`,
        method: 'POST',
        body: {
          ...payload
        },
      }),
      // Pick out data and prevent nested properties in a hook or selector(eg.response.result)
      transformResponse: (response, meta, arg) => response,
      // Pick out errors and prevent nested properties in a hook or selector(status/success)
      transformErrorResponse: (response, meta, arg) => response.success,
    }),

    ////////////////// user sign up/register ///////////
    userRegister: build.mutation({
      query: ({ email , password, name }) =>({
        url:`api/auth/signin`,
        method: 'POST',
        body: {
          email,
          password,
          name
        },
      }) 
    }),

  }),
})


// if using mutation add 'use' and add 'Mutation' at the end
// if its a query add 'use' and add 'Query' at the end
export const { useUserLogInMutation, useUserRegisterMutation } = userApi; 