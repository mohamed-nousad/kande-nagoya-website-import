import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const VehicleGetAll = createAsyncThunk("Vehicle/GetAll", async () => {
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

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //------This is getAll-------
      .addCase(VehicleGetAll.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(VehicleGetAll.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(VehicleGetAll.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default vehicleSlice.reducer;
