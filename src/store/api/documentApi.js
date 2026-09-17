import { apiSlice } from "./apiSlice";

const BASE = "/api/Document";

export const documentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: () => ({ url: `${BASE}/GetAll`, method: "GET" }),
      transformResponse: (response) => ({
        data: response?.data ?? [],
        count: response?.count ?? 0,
        totalCount: response?.total ?? 0
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Document", id: "LIST" },
              ...result.map((x) => ({ type: "Document", id: x._id })),
            ]
          : [{ type: "Document", id: "LIST" }],
    }),
    getDocument: builder.query({
      query: (id) => ({ url: `${BASE}/${id}`, method: "GET" }),
      transformResponse: (response) => response?.data ?? {},
      providesTags: (result, error, id) => [{ type: "Document", id }],
    })
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentQuery
} = documentApi;
