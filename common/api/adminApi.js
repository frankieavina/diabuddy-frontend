import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const adminApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  reducerPath: 'adminApi',
  endpoints: (build) => ({
    
    //////////////////////get all users///////////////////////
    getAllUsers: build.query({
      query: () => `api/users/admin/getAll`,
      // // Pick out data and prevent nested properties in a hook or selector(eg.response.result)
      // transformResponse: (response, meta, arg) => response,
      // // Pick out errors and prevent nested properties in a hook or selector(status/success)
      // transformErrorResponse: (response, meta, arg) => response.success,
    }),

    /////////////////////get User bolus and basal test info////////////////////////
    getUserBolus: build.query({
      query: (userId) => `api/users/admin/getBolus/${userId}`,
      transformResponse: (response, meta, arg) => response,
    }),

    //need to add user id and date of bolus info
    getUserBasal: build.query({
      query: (userId) => `api/users/admin/getBasal/${userId}`,
      transformResponse: (response, meta, arg) => response,
    }),

    /////////////////////edit User info////////////////////////
    updateUser: build.mutation({
        query: ({ userId, payload }) =>({
            url:`api/users/admin/update`,
            method: 'PATCH',
            body: {
                user: userId,
                ...payload,
            },
        }),
        transformResponse: (response, meta, arg) => response,
    }),

    /////////////////////delete User info////////////////////////
    deleteUser: build.mutation({
        query: ({ userId }) =>({
          url:`api/users/admin/delete/${userId}`,
          method: 'DELETE',
          body: {
            email,
            password,
            name
          },
        }),
        transformResponse: (response, meta, arg) => response,
    }),

  }),
})


export const { useDeleteUserMutation, useUpdateUserMutation, useGetUserBolusQuery, useGetUserBasalQuery, useGetAllUsersQuery } = adminApi; 