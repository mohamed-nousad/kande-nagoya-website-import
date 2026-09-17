import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/services/axiosBaseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
   tagTypes: [
    "Vehicle",
    "WebStock",
    "Supplier",
    "Country",
    "DestinationPort",
    "Document",
    "Location",
    "WebUser",
    "IpCountry",
    "WebQuery",
    "SaveFavourite",
  ],
  endpoints: () => ({}),
});
