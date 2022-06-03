import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosClient} from '../../app/api/apiApp';
import {setUser} from './setUser';

const initialValue = {
  dataLogin: {},
  loading: false,
  err: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialValue,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAuth.pending, (state, action) => {
        state.loading = true;
        state.dataLogin = {};
        state.err = null;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.dataLogin = action?.payload;
        state.err = null;
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.loading = false;
        state.dataLogin = {};
        state.err = action.payload?.message;
      })
      .addCase(signupAuth.pending, (state, action) => {
        state.loading = true;
        state.dataLogin = {};
        state.err = null;
      })
      .addCase(signupAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.dataLogin = action?.payload;
        state.err = null;
      })
      .addCase(signupAuth.rejected, (state, action) => {
        state.loading = false;
        state.dataLogin = {};
        state.err = action.payload?.message;
      });
  },
});

export const loginAuth = createAsyncThunk(
  'auth/login',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {username, password} = params;
      const res = await axiosClient.post('auth/login', {
        username,
        password,
      });
      const resBe = JSON.parse(JSON.stringify(res?.data))?.accessToken;
      resBe && setUser(JSON.stringify(res?.data));
      callback(res.status, null);
      return JSON.stringify(res?.data);
    } catch (error) {
      const messErr = error?.response.data?.message;
      console.log(messErr);
      callback(error.response.status, messErr);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const signupAuth = createAsyncThunk(
  'auth/register',
  async (params, thunkApi) => {
    try {
      const {firstN, lastN, username, password} = params;

      const res = await axiosClient.post('auth/register', {
        firstName: firstN,
        lastName: lastN,
        username: username,
        password: password,
      });

      return JSON.stringify(res?.data);
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const loginAction = state => state.dataLogin;
export const {reducer, actions} = authSlice;
export default reducer;
