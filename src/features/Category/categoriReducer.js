import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosClient} from '../../app/api/apiApp';
import {
  getListProcess,
  createProcess,
  getListUnit,
  createUnit,
  deleteUnit,
  deleteProcess,
  getListCategoryEmployee,
  createCategoryEmployee,
  deleteCategoryEmployee
} from './categoryAction';

const initialValue = {
  listProcess: [],
  listUnit: [],
  listCategoryEmployee: [],
  loading: false,
  err: null,
};

const categoriSlice = createSlice({
  name: 'cayegoriSlice',
  initialState: initialValue,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListProcess.pending, (state, action) => {
        state.loading = true;
        state.listProcess = [];
        state.err = null;
      })
      .addCase(getListProcess.fulfilled, (state, action) => {
        state.loading = false;
        state.listProcess = action.payload;
        state.err = null;
      })
      .addCase(getListProcess.rejected, (state, action) => {
        state.loading = false;
        state.listProcess = [];
        state.err = action.payload.message;
      })
      .addCase(getListUnit.pending, (state, action) => {
        state.loading = true;
        state.listUnit = [];
        state.err = null;
      })
      .addCase(getListUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.listUnit = action.payload;
        state.err = null;
      })
      .addCase(getListUnit.rejected, (state, action) => {
        state.loading = false;
        state.listUnit = [];
        state.err = action.payload.message;
      })
      .addCase(deleteUnit.pending, (state, action) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(deleteUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(deleteUnit.rejected, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(deleteProcess.pending, (state, action) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(deleteProcess.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(deleteProcess.rejected, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(getListCategoryEmployee.pending, (state, action) => {
        state.loading = true;
        state.listCategoryEmployee = [];
        state.err = null;
      })
      .addCase(getListCategoryEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.listCategoryEmployee = action.payload;
        state.err = null;
      })
      .addCase(getListCategoryEmployee.rejected, (state, action) => {
        state.loading = false;
        state.listCategoryEmployee = [];
        state.err = action.payload.message;
      })
      .addCase(createCategoryEmployee.pending, (state, action) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(createCategoryEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(createCategoryEmployee.rejected, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(deleteCategoryEmployee.pending, (state, action) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(deleteCategoryEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(deleteCategoryEmployee.rejected, (state, action) => {
        state.loading = false;
        state.err = null;
      });
  },
});

export const {reducer, actions} = categoriSlice;
export default reducer;
