import { apiSlice } from "./apiSlice";
import { fetchCountryFromIp } from "@/services/webUserCountryApi";

export const ipCountryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIpCountry: builder.query({
      queryFn: async () => {
        const data = await fetchCountryFromIp();
        return data ? { data } : { error: { status: 500, data: "Failed try again" } };
      },
      providesTags: [{ type: "IpCountry", id: "CURRENT" }],
    }),
  }),
});

export const { useGetIpCountryQuery } = ipCountryApi;