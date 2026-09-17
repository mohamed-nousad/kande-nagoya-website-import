import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FavouriteVehicleGetAll } from "./favouriteVehicleSlice";

export const UserGetAll = createAsyncThunk("User/GetAll", async () => {
  const response = [];
  return response;
});

export const UserFavouritesUpdate = createAsyncThunk(
  "User/update",
  async (vehicleId, thunkAPI) => {
    try {
      const response = [];
      thunkAPI.dispatch(FavouriteVehicleGetAll());
      return response;
    } catch (error) {
      return error
    }
  }
);

const initialState = {
  data: [],
  loading: true,
  error: null,
  status: "idle" | "loading" | "succeeded" | "failed",
  totalCount: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //------This is getAll-------
      .addCase(UserGetAll.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(UserGetAll.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(UserGetAll.rejected, (state, action) => {
        state.loading = false;
      })

      //-----------This is update------------
      .addCase(UserFavouritesUpdate.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(UserFavouritesUpdate.fulfilled, (state, action) => {
        console.log("Updated Successfully");
        state.loading = false;
        let updatedItem = action.payload.data;

        state.data = state.data.map((item) => {
          return item._id === updatedItem._id ? updatedItem : item;
        });
      })
      .addCase(UserFavouritesUpdate.rejected, (state, action) => {
        state.error = action.payload || "Update Unsuccessful";
        console.log(state.error);
        state.loading = false;
      })
  },
});

export default userSlice.reducer;
