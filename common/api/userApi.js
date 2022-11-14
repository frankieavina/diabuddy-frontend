import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setProfileImage = (pic) => {
  const imageProfile = pic;
}

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://diabuddy-mysql-backend-production.up.railway.app/' }),
  reducerPath: 'signIn',
  endpoints: (build) => ({
    // user log in 
    // builder .query or .mutation 
    userLogIn: build.mutation({
      query: ({ email , password }) =>({
        url:`api/auth/signin`,
        method: 'POST',
        body: {
          email,
          password
        },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status,
    }),

    // user sign up/register
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