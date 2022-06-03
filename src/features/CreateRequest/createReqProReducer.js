import {createSlice} from '@reduxjs/toolkit';
import {
  getListReqProduct,
  createDataProcessProd,
  getDataEmployeelProd,
  getDataMaterialProd,
  getListReqCurrent,
  calculAccountProd,
} from './createReqProActions';

const iniVal = {
  err: null,
  loading: false,
  listReqProduct: [],
  dataProcessPro: [],
  dataListMaterial: [],
  dataListEmployee: [],
  listReqCurrent: [],
  calculAccountProd: {},
};

const createReqProduct = createSlice({
  name: 'createReqProduct',
  initialState: iniVal,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListReqProduct.pending, (state, action) => {
        state.loading = true;
        state.listReqProduct = [];
        state.err = null;
      })
      .addCase(getListReqProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.listReqProduct = action.payload;
        state.err = null;
      })
      .addCase(getListReqProduct.rejected, (state, action) => {
        state.loading = false;
        state.listReqProduct = [];
        state.err = action.payload.message;
      })
      .addCase(getDataEmployeelProd.pending, (state, action) => {
        state.loading = true;
        state.dataListEmployee = [];
        state.err = null;
      })
      .addCase(getDataEmployeelProd.fulfilled, (state, action) => {
        state.loading = false;
        state.dataListEmployee = action.payload;
        state.err = null;
      })
      .addCase(getDataEmployeelProd.rejected, (state, action) => {
        state.loading = false;
        state.dataListEmployee = [];
        state.err = action.payload.message;
      })
      .addCase(getDataMaterialProd.pending, (state, action) => {
        state.loading = true;
        state.dataListMaterial = [];
        state.err = null;
      })
      .addCase(getDataMaterialProd.fulfilled, (state, action) => {
        state.loading = false;
        state.dataListMaterial = action.payload;
        state.err = null;
      })
      .addCase(getDataMaterialProd.rejected, (state, action) => {
        state.loading = false;
        state.dataListMaterial = [];
        state.err = action.payload.message;
      })
      .addCase(getListReqCurrent.pending, (state, action) => {
        state.loading = true;
        state.listReqCurrent = [];
        state.err = null;
      })
      .addCase(getListReqCurrent.fulfilled, (state, action) => {
        state.loading = false;
        state.listReqCurrent = action.payload;
        state.err = null;
      })
      .addCase(getListReqCurrent.rejected, (state, action) => {
        state.loading = false;
        state.listReqCurrent = [];
        state.err = action.payload.message;
      })
      .addCase(calculAccountProd.pending, (state, action) => {
        state.loading = true;
        state.calculAccountProd = {};
        state.err = null;
      })
      .addCase(calculAccountProd.fulfilled, (state, action) => {
        state.loading = false;
        state.calculAccountProd = action.payload;
        state.err = null;
      })
      .addCase(calculAccountProd.rejected, (state, action) => {
        state.loading = false;
        state.calculAccountProd = {};
        state.err = action.payload.message;
      });
  },
});

export const {reducer, actions} = createReqProduct;
export default reducer;
