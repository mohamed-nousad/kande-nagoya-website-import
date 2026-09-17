import { apiSlice } from "./apiSlice";

const BASE = "/api/Cache";

export const cacheApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    clearServerCache: builder.mutation({
      query: () => ({ url: `${BASE}/Clear`, method: "DELETE" }),
    }),
  }),
});

export const { useClearServerCacheMutation } = cacheApi;
