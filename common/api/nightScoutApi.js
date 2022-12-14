import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const nightScoutApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  reducerPath: 'adminApi',
  endpoints: (build) => ({

    getUserBasal: build.query({
        query: (userId) =>  `api/v1/entries/sgv.json?find[dateString][$gte]=${date1}&find[dateString][$lte]=${date2}`,
        transformResponse: (response, meta, arg) => response.result.tests,
      }),
    }),
})

export const { useGetUserBasalQuery } = adminApi; 