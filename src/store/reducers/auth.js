import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getMe = createAsyncThunk('auth/getMe', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      return data;
    } else {
      return rejectWithValue(data.error);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const auth = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuth: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isAuth = true;
    },
    logOut: (state, action) => {
      state.user = null;
      state.isAuth = false;
    },
    setAuth: (state, action) => {
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.user = null;
      state.isAuth = false;
    });
  },
});

export const { setCredentials, logOut } = auth.actions;

export default auth.reducer;

export const selectCurrentUser = (state) => state.auth.user;
