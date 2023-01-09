import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const nightScoutApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://frankiecgm.up.railway.app/' }),
  reducerPath: 'graphApi',
  endpoints: (build) => ({

    getUserGlucoseData: build.query({
        query: ({date1, date2}) =>  ({
          url: `api/v1/entries/sgv.json?find[dateString][$gte]=${date1}&find[dateString][$lte]=${date2}&count=233`,
          method: 'GET',
        }),
        transformResponse: (response, meta, arg) => {
          return response.map((data) => {
              console.log('jjjjjj:',data)
              return {
                date: data.date,
                svg: data.sgv
              }
          })
        }
    }),

  }),
})

export const { useGetUserGlucoseDataQuery } = nightScoutApi; 