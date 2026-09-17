import { apiSlice } from "./apiSlice";

const BASE = "/api/DestinationPort";

export const destinationPortApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDestinationPorts: builder.query({
      query: () => ({ url: `${BASE}/GetAll`, method: "GET" }),
      transformResponse: (response) => ({
        data: response?.data ?? [],
        count: response?.count ?? 0,
        totalCount: response?.total ?? 0
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "DestinationPort", id: "LIST" },
              ...result.map((item) => ({ type: "DestinationPort", id: item._id })),
            ]
          : [{ type: "DestinationPort", id: "LIST" }],
    }),
    getDestinationPort: builder.query({
      query: (id) => ({ url: `${BASE}/${id}`, method: "GET" }),
      transformResponse: (response) => response?.data,
      providesTags: (result, error, id) => [{ type: "DestinationPort", id }],
    })
  }),
});

export const {
  useGetDestinationPortsQuery,
  useGetDestinationPortQuery
} = destinationPortApi;
