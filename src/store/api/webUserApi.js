import { apiSlice } from "./apiSlice";

const BASE = "/api/WebUser";

export const webUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWebUsers: builder.query({
      query: () => ({ url: `${BASE}/GetAll`, method: "GET" }),
      transformResponse: (response) => ({
        data: response?.data ?? [],
        count: response?.count ?? 0,
        totalCount: response?.total ?? 0
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "WebUser", id: "LIST" },
              ...result.map((x) => ({ type: "WebUser", id: x._id })),
            ]
          : [{ type: "WebUser", id: "LIST" }],
    }),
    getWebUser: builder.query({
      query: (id) => ({ url: `${BASE}/${id}`, method: "GET" }),
      transformResponse: (response) => response?.data,
      providesTags: (result, error, id) => [{ type: "WebUser", id }],
    }),
    updateWebUser: builder.mutation({
      query: ({ id, data }) => ({ url: `${BASE}/Update/${id}`, method: "PUT", data }),
      invalidatesTags: (result, error, { id }) => [
        { type: "WebUser", id },
        { type: "WebUser", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetWebUsersQuery,
  useGetWebUserQuery,
  useUpdateWebUserMutation
} = webUserApi;
