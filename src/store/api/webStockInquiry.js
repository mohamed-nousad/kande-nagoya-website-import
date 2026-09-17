import { apiSlice } from "./apiSlice";

const BASE = "/api/WebQuery";

export const webStockInquiryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWebQueries: builder.query({
      query: () => ({ url: `${BASE}/GetAll`, method: "GET" }),
      transformResponse: (response) => response?.data ?? [],
      providesTags: (result) =>
        result
          ? [
              { type: "WebQuery", id: "LIST" },
              ...result.map((item) => ({ type: "WebQuery", id: item._id })),
            ]
          : [{ type: "WebQuery", id: "LIST" }],
    }),
    getWebQuery: builder.query({
      query: (id) => ({ url: `${BASE}/${id}`, method: "GET" }),
      transformResponse: (response) => response?.data,
      providesTags: (result, error, id) => [{ type: "WebQuery", id }],
    }),
    createWebQuery: builder.mutation({
      query: (data) => ({ url: `${BASE}/Create`, method: "POST", data }),
      invalidatesTags: [{ type: "WebQuery", id: "LIST" }],
    }),
    updateWebQuery: builder.mutation({
      query: ({ id, data }) => ({ url: `${BASE}/Update/${id}`, method: "PUT", data }),
      invalidatesTags: (result, error, { id }) => [
        { type: "WebQuery", id },
        { type: "WebQuery", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetWebQueriesQuery,
  useGetWebQueryQuery,
  useCreateWebQueryMutation,
  useUpdateWebQueryMutation,
} = webStockInquiryApi;