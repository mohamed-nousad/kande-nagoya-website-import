import { apiSlice } from "./apiSlice";

const BASE = "/api/Supplier";

export const supplierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query({
  query: (params) => ({
    url: `${BASE}/GetAll`,
    method: "GET",
    params: params,
  }),
  transformResponse: (response) => ({
    data: response?.data ?? [],
    count: response?.count ?? 0,
    totalCount: response?.total ?? 0
  }),
  providesTags: (result) =>
    result
      ? [
          { type: "Supplier", id: "LIST" },
          ...result.map((s) => ({ type: "Supplier", id: s._id })),
        ]
      : [{ type: "Supplier", id: "LIST" }],
  }),
  getSupplier: builder.query({
    query: (id) => ({ url: `${BASE}/${id}`, method: "GET" }),
    transformResponse: (response) => response?.data,
    providesTags: (result, error, id) => [{ type: "Supplier", id }],
  })
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSupplierQuery
} = supplierApi;
