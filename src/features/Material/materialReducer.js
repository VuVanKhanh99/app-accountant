import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  addMaterial,
  getListMaterials,
  createItemPrice,
  getListPriceItem,
  deletePriceItem,
  createPriceStuff,
  getListPriceStuff,
  deletePriceStuff,
} from './materialActions';

const initValue = {
  loading: false,
  err: null,
  listMaterial: [],
  listPriceItem: [],
  listPriceStuff: [],
};

const materialSlice = createSlice({
  name: 'materialSlice',
  initialState: initValue,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListMaterials.pending, (state, action) => {
        state.loading = true;
        state.listMaterial = [];
        state.err = null;
      })
      .addCase(getListMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.listMaterial = action.payload;
        state.err = null;
      })
      .addCase(getListMaterials.rejected, (state, action) => {
        state.loading = false;
        state.listMaterial = [];
        state.err = action.payload.message;
      })
      .addCase(getListPriceItem.pending, (state, action) => {
        state.loading = true;
        state.listPriceItem = [];
        state.err = null;
      })
      .addCase(getListPriceItem.fulfilled, (state, action) => {
        state.loading = false;
        state.listPriceItem = action.payload;
        state.err = null;
      })
      .addCase(getListPriceItem.rejected, (state, action) => {
        state.loading = false;
        state.listPriceItem = [];
        state.err = action.payload.message;
      })
      .addCase(createItemPrice.pending, (state, action) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(createItemPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(createItemPrice.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload.message;
      })
      .addCase(createPriceStuff.pending, (state, action) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(createPriceStuff.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(createPriceStuff.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload.message;
      })
      .addCase(getListPriceStuff.pending, (state, action) => {
        state.loading = true;
        state.listPriceStuff = [];
        state.err = null;
      })
      .addCase(getListPriceStuff.fulfilled, (state, action) => {
        state.loading = false;
        state.listPriceStuff = action.payload;
        state.err = null;
      })
      .addCase(getListPriceStuff.rejected, (state, action) => {
        state.loading = false;
        state.listPriceStuff = [];
        state.err = action.payload.message;
      })
      .addCase(deletePriceStuff.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(deletePriceStuff.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload.message;
      })
      .addCase(deletePriceStuff.pending, (state, action) => {
        state.loading = true;
        state.err = null;
      })
  },
});

export const {actions, reducer} = materialSlice;
export default reducer;
