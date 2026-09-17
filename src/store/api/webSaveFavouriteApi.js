import { apiSlice } from "./apiSlice";

const BASE = "/api/SaveFavourite";

export const webSaveFavouriteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSaveFavourites: builder.query({
      query: (userId) => ({ url: `${BASE}/GetAll/${userId}`, method: "GET" }),
      transformResponse: (response) => ({
        data: response?.data ?? [],
        count: response?.count ?? 0,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "SaveFavourite", id: "LIST" },
              ...result.data.map((x) => ({ type: "SaveFavourite", id: x._id })),
            ]
          : [{ type: "SaveFavourite", id: "LIST" }],
    }),
    toggleFavourite: builder.mutation({
      query: ({ userId, vehicleId }) => ({
        url: `${BASE}/Toggle/${userId}`,
        method: "PUT",
        data: { vehicleId },
      }),
      invalidatesTags: [
      { type: "SaveFavourite", id: "LIST" },
      { type: "Vehicle", id: "WEBSTOCK-whitelist" },
    ],
    }),
  }),
});

export const {
  useGetSaveFavouritesQuery,
  useToggleFavouriteMutation,
} = webSaveFavouriteApi;