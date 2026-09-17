import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const FavouriteVehicleGetAll = createAsyncThunk("FavouriteVehicle/GetAll", async () => {
  const response = [];
  return response;
});

const initialState = {
  data: [],
  loading: true,
  error: null,
  status: "idle" | "loading" | "succeeded" | "failed",
  totalCount: 0,
};

export const favouriteVehicleSlice = createSlice({
  name: "favouriteVehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //------This is getAll-------
      .addCase(FavouriteVehicleGetAll.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(FavouriteVehicleGetAll.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(FavouriteVehicleGetAll.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default favouriteVehicleSlice.reducer;
