import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const nightScoutApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'frankiecgm.up.railway.app/' }),
  reducerPath: 'graphApi',
  endpoints: (build) => ({

    getUserGlucoseData: build.query({
        query: ({date1, date2}) =>  `api/v1/entries/sgv.json?find[dateString][$gte]=${date1}&find[dateString][$lte]=${date2}`,
        transformResponse: (response, meta, arg) => {
            console.log('Response');
            return {
                xData: response,
                yData: response
            }
        } 
    }),

  }),
})

export const { useGetUserGlucoseDataQuery } = nightScoutApi; 