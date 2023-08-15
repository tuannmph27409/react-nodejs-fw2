import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { pause } from '../utils/pause';
import { IProduct } from '../interfaces/product';

const productApi = createApi({
    reducerPath: "product",
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8088/api",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
            headers.set("authorization", `Bearer ${token}`)
            // modify header theo từng request
            return headers;
        },
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct, void>({
            query: () => `/product`,
            providesTags: ['Product']
        }),
        getProductById: builder.query<IProduct, number | string>({
            query: (_id) => `/${_id}`,
            providesTags: ['Product']
        }),
        addProduct: builder.mutation({
            query: (product: IProduct) => ({
                url: `/add`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `update/${product._id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation<void, number>({
            query: (_id) => ({
                url: `/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Product']
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useRemoveProductMutation,
    useAddProductMutation
} = productApi;
export const productReducer = productApi.reducer;

export default productApi;