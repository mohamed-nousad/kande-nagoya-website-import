import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/AuthService";
import { tokenService } from "@/services/authUtils";
import { getSession } from "@/auth/session";

export const initialState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: null,
  token: tokenService.getAccessToken(),
  refreshToken: tokenService.getRefreshToken(),
  user: getSession() ?? null, 
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.login(data);
      tokenService.setAccessToken(response.accessToken);
      tokenService.setRefreshToken(response.refreshToken);
      dispatch(setAuthUser(response.user));
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.register(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const token = tokenService.getRefreshToken();
    const response = await authService.refreshToken(token);
    const accessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;
    tokenService.setAccessToken(accessToken);
    tokenService.setRefreshToken(newRefreshToken);
    return { accessToken, newRefreshToken };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Session expired");
  }
});

export const signOut = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  tokenService.removeAccessToken();
  tokenService.removeRefreshToken();
});

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.loginWithGoogle(data);
      tokenService.setAccessToken(response.accessToken);
      tokenService.setRefreshToken(response.refreshToken);
      dispatch(setAuthUser(response.user));
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Google sign in failed");
    }
  }
);

export const signInWithApple = createAsyncThunk(
  "auth/signInWithApple",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.loginWithApple(data);
      tokenService.setAccessToken(response.accessToken);
      tokenService.setRefreshToken(response.refreshToken);
      dispatch(setAuthUser(response.user));
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Apple sign in failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    showAuthMessage: (state, action) => {
      state.message = action.payload;
      state.showMessage = true;
      state.loading = false;
    },
    hideAuthMessage: (state) => {
      state.message = "";
      state.showMessage = false;
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.token = null;
      state.user = null;
      state.redirect = "/";
    },
    showLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.showMessage = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.showMessage = true;
        state.message = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.showMessage = false;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.showMessage = true;
        state.message = action.payload;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.newRefreshToken;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.refreshToken = null;
        state.user = null;
        state.redirect = "/";
        tokenService.removeAccessToken();
        tokenService.removeRefreshToken();
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.redirect = "/";
      })
      .addCase(signOut.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.redirect = "/";
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.showMessage = false;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.showMessage = true;
        state.message = action.payload;
      })
      .addCase(signInWithApple.pending, (state) => {
        state.loading = true;
        state.showMessage = false;
      })
      .addCase(signInWithApple.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
      })
      .addCase(signInWithApple.rejected, (state, action) => {
        state.loading = false;
        state.showMessage = true;
        state.message = action.payload;
      });
  },
});

export const {
  setAuthUser,
  showAuthMessage,
  hideAuthMessage,
  signOutSuccess,
  showLoading,
} = authSlice.actions;

export default authSlice.reducer;