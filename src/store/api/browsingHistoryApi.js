import { apiSlice } from "./apiSlice";

const BASE = "/api/BrowsingHistory";

export const browsingHistoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateBrowsingHistory: builder.mutation({
      query: ({ id, data }) => ({ url: `${BASE}/Update/${id}`, method: "PUT", data }),
      invalidatesTags: [{ type: "Vehicle", id: "WEBSTOCK-browsingHistory" }],
    }),
  }),
});

export const {
  useUpdateBrowsingHistoryMutation,
} = browsingHistoryApi;