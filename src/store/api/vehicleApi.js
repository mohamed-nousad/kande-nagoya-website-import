import { apiSlice } from "./apiSlice";

const BASE = "/api/Vehicle";

export const vehicleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: ({ page, limit, sort = "-kandeNo" } = {}) => {
        const params = { sort };
        if (page !== undefined) params.page = page;
        if (limit !== undefined) params.limit = limit;
        return { url: `${BASE}/GetAll`, method: "GET", params };
      },
      transformResponse: (response) => ({
        data: response?.data ?? [],
        count: response?.count ?? 0,
        totalCount: response?.total ?? 0,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Vehicle", id: "LIST" },
              ...result.data.map((v) => ({ type: "Vehicle", id: v._id })),
            ]
          : [{ type: "Vehicle", id: "LIST" }],
    }),

    getVehicle: builder.query({
      query: (id) => ({ url: `${BASE}/${id}`, method: "GET" }),
      transformResponse: (response) => response?.data,
      providesTags: (result, error, id) => [{ type: "Vehicle", id }],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useGetVehicleQuery
} = vehicleApi;