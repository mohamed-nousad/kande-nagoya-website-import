import { apiSlice } from "./apiSlice";

const BASE = "/api/Location";

export const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: () => ({ url: `${BASE}/GetAll`, method: "GET" }),
      transformResponse: (response) => ({
        data: response?.data ?? [],
        count: response?.count ?? 0,
        totalCount: response?.total ?? 0
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Location", id: "LIST" },
              ...result.map((x) => ({ type: "Location", id: x._id })),
            ]
          : [{ type: "Location", id: "LIST" }],
    }),
    getLocation: builder.query({
      query: (id) => ({ url: `${BASE}/${id}`, method: "GET" }),
      transformResponse: (response) => response?.data,
      providesTags: (result, error, id) => [{ type: "Location", id }],
    })
  }),
});

export const {
  useGetLocationsQuery
} = locationApi;
