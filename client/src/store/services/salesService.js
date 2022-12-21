import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const salesService = createApi({
    reducerPath: 'sales',
    tagTypes: 'sales',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        prepareHeaders: (headers, {getState}) => {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            console.log(token)
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            cSales: builder.mutation({
                query: (data) => {
                   return {
                       url: '/create-sales',
                       method: 'POST',
                       body: data
                   }
                },
                invalidatesTags: ['sales']
            }),
            updateSales: builder.mutation({
                query: data => {
                    return {
                       url: '/sales',
                       method: 'PUT',
                       body: data
                    }
                },
                invalidatesTags: ['sales']
            }),
            deleteSales: builder.mutation({
                query: id => {
                    return {
                        url: `/delete/${id}`,
                        method: 'DELETE'
                    }
                },
                invalidatesTags: ['sales']
            }),
            getSales: builder.query({
                query: (page) => {
                 return {
                     url: `/sales/${page}`,
                     method: 'GET'
                 }
                },
                providesTags: ['sales']
            }),
            getAllSales: builder.query({
                query: () => {
                 return {
                     url: `/sales`,
                     method: 'GET'
                 }
                },
                providesTags: ['sales']
            }),
            getSale: builder.query({
                query: id => {
                return {
                    url: `/sales/${id}`,
                    method: 'GET'
                }
                },
                providesTags: ['sales']
            })
        }
    }
})
export const {useCSalesMutation, useDeleteSalesMutation , useUpdateSalesMutation, useGetSalesQuery, useGetAllSalesQuery, useGetSaleQuery} = salesService;
export default salesService