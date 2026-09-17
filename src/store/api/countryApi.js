import { apiSlice } from "./apiSlice";

const BASE = "/api/Country";

export const countryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({ url: `${BASE}/GetAll`, method: "GET" }),
      transformResponse: (response) => ({
        data: response?.data ?? [],
        count: response?.count ?? 0,
        totalCount: response?.total ?? 0
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Country", id: "LIST" },
              ...result.map((item) => ({ type: "Country", id: item._id })),
            ]
          : [{ type: "Country", id: "LIST" }],
    }),
    getCountry: builder.query({
      query: (id) => ({ url: `${BASE}/${id}`, method: "GET" }),
      transformResponse: (response) => response?.data,
      providesTags: (result, error, id) => [{ type: "Country", id }],
    })
  }),
});

export const {
  useGetCountriesQuery,
  useGetCountryQuery
} = countryApi;
