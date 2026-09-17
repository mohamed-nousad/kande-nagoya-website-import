import { apiSlice } from "./apiSlice";
import { formatVehicleCard, formatStockVehicleCard } from "@/utils/vehicleFormatters";

const BASE = "/api/WebStock";

const buildWebStockEndpoint = (category) => ({
  query: ({ page, limit, ...rest } = {}) => ({
    url: `${BASE}/GetWebStocks`,
    method: "GET",
    params: { category, page, limit, ...rest },
  }),
  transformResponse: (response) => ({
    data: (response?.data ?? []).map(formatVehicleCard).filter(Boolean),
    totalCount: response?.totalCount ?? 0,
    page: response?.page ?? 1,
    limit: response?.limit ?? 0,
    totalPages: response?.totalPages ?? 1,
  }),
  providesTags: (result) =>
    result?.data
      ? [
          { type: "Vehicle", id: `WEBSTOCK-${category}` },
          ...result.data.map((v) => ({ type: "Vehicle", id: v.id })),
        ]
      : [{ type: "Vehicle", id: `WEBSTOCK-${category}` }],
});

export const webStockApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
      getCountryStock: builder.query({
      query: ({ page, limit, countryStock, ...rest } = {}) => ({
          url: `${BASE}/GetWebStocks`,
          method: "GET",
          params: { countryStock, page, limit, ...rest },
        }),
      transformResponse: (response) => ({
        data: (response?.data ?? []).map(formatVehicleCard).filter(Boolean),
        totalCount: response?.totalCount ?? 0,
        page: response?.page ?? 1,
        limit: response?.limit ?? 0,
        totalPages: response?.totalPages ?? 1,
      }),
      providesTags: (result) =>
        result?.data
        ? [
            { type: "Vehicle", id: "WEBSTOCK-COUNTRY-STOCK" },
            ...result.data.map((v) => ({ type: "Vehicle", id: v.id })),
          ]
        : [{ type: "Vehicle", id: "WEBSTOCK-COUNTRY-STOCK" }],
    }),
    getClearance: builder.query(buildWebStockEndpoint("clearance")),
    getLowMileage: builder.query(buildWebStockEndpoint("lowMileage")),
    getNewArrivals: builder.query(buildWebStockEndpoint("newArrivals")),
    getPopularVehicles: builder.query(buildWebStockEndpoint("popular")),
    getRecommended: builder.query(buildWebStockEndpoint("recommended")),
    getBrowsingHistory: builder.query(buildWebStockEndpoint("browsingHistory")),
    getInquiredList: builder.query(buildWebStockEndpoint("inquired")),
    getWhitelist: builder.query(buildWebStockEndpoint("whitelist")),

    getStockList: builder.query({
      query: (params = {}) => ({ url: `${BASE}/GetWebStocks`, method: "GET", params }),
      transformResponse: (response) => ({
        data: (response?.data ?? []).map(formatStockVehicleCard).filter(Boolean),
        totalCount: response?.totalCount ?? 0,
        page: response?.page ?? 1,
        limit: response?.limit ?? 0,
        totalPages: response?.totalPages ?? 1,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Vehicle", id: "STOCK-LIST" },
              ...result.data.map((v) => ({ type: "Vehicle", id: v._id })),
            ]
          : [{ type: "Vehicle", id: "STOCK-LIST" }],
    }),
    getStock: builder.query({
      query: (id) => ({ url: `${BASE}/GetWebStock/${id}`, method: "GET" }),
      transformResponse: (response) => response?.data,
      providesTags: (result, error, id) => [{ type: "Vehicle", id }],
    }),
    getFilterOptions: builder.query({
      query: () => ({ url: `${BASE}/GetWebFilterOptions`, method: "GET" }),
      transformResponse: (response) => response?.data ?? {},
      providesTags: [{ type: "Vehicle", id: "FILTER_OPTIONS" }],
    }),

    getStocksFeatures: builder.query({
      query: () => ({ url: `${BASE}/GetWebStocksFeatures`, method: "GET" }),
      transformResponse: (response) => response?.data ?? [],
      providesTags: [{ type: "Vehicle", id: "FEATURES" }],
    }),

    getSearchSuggestions: builder.query({
    query: (search) => ({
      url: `${BASE}/GetSearchSuggestions`,
      method: "GET",
      params: { search },
    }),
    transformResponse: (response) => ({
      data: response?.data ?? [], 
    }),
  }),
  }),
});

export const {
  useGetCountryStockQuery,
  useGetClearanceQuery,
  useGetLowMileageQuery,
  useGetNewArrivalsQuery,
  useGetPopularVehiclesQuery,
  useGetRecommendedQuery,
  useGetBrowsingHistoryQuery,
  useGetInquiredListQuery,
  useGetWhitelistQuery,
  useGetStockListQuery,
  useGetStockQuery,
  useGetFilterOptionsQuery,
  useGetStocksFeaturesQuery,
  useGetSearchSuggestionsQuery,
} = webStockApi;