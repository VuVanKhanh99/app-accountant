import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  createRecipe,
  getListRecipe,
  deleteRecipe,
  createManagerEmployee,
  getIndexInsurance,
  getAccountantEm,
  deleteIndexInsurance,
  createAccountantEm,
  getConsultInfo133,
  getCostConsult133,
  getTSCD,
  getAccountTSCD,
  getListIncompleteProd,
  createIncompleteProd
} from './systemAction';

const iniValue = {
  err: null,
  loading: false,
  loadingAccountEm:false,
  listRecipe: [],
  dataIndexInsurance: [],
  dataAccountantEm: [],
  dataConsultInfo133:[],
  dataCostConsult133:[],
  dataTSCD:[],
  dataAccountTSCD:[],
  dataIncompleteProd:[],
};

const systemSlice = createSlice({
  name: 'systemSlice',
  initialState: iniValue,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListRecipe.pending, (state, action) => {
        state.loading = true;
        state.listRecipe = [];
        state.err = null;
      })
      .addCase(getListRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.listRecipe = action.payload;
        state.err = null;
      })
      .addCase(getListRecipe.rejected, (state, action) => {
        state.loading = false;
        state.listRecipe = [];
        state.err = action.payload.message;
      })
      .addCase(deleteRecipe.pending, (state, action) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload.message;
      })
      .addCase(getIndexInsurance.pending, (state, action) => {
        state.loading = true;
        state.dataIndexInsurance = [];
        state.err = null;
      })
      .addCase(getIndexInsurance.fulfilled, (state, action) => {
        state.loading = false;
        state.dataIndexInsurance = action.payload;
        state.err = null;
      })
      .addCase(getIndexInsurance.rejected, (state, action) => {
        state.loading = false;
        state.dataIndexInsurance = [];
        state.err = action.payload.message;
      })
      .addCase(getAccountantEm.pending, (state, action) => {
        state.loading = true;
        state.dataAccountantEm = [];
        state.err = null;
      })
      .addCase(getAccountantEm.fulfilled, (state, action) => {
        state.loading = false;
        state.dataAccountantEm = action.payload;
        state.err = null;
      })
      .addCase(getAccountantEm.rejected, (state, action) => {
        state.loading = false;
        state.dataAccountantEm = [];
        state.err = action.payload.message;
      })
      .addCase(deleteIndexInsurance.pending, (state, action) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(deleteIndexInsurance.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
      })
      .addCase(deleteIndexInsurance.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload.message;
      })
      .addCase(createAccountantEm.pending, (state, action) => {
        state.loadingAccountEm = true;
        state.err = null;
      })
      .addCase(createAccountantEm.fulfilled, (state, action) => {
        state.loadingAccountEm = false;
        state.err = null;
      })
      .addCase(createAccountantEm.rejected, (state, action) => {
        state.loadingAccountEm = false;
        state.err = action.payload.message;
      })
      .addCase(getConsultInfo133.pending, (state, action) => {
        state.loading = true;
        state.dataConsultInfo133 = [];
        state.err = null;
      })
      .addCase(getConsultInfo133.fulfilled, (state, action) => {
        state.loading = false;
        state.dataConsultInfo133 = action.payload;
        state.err = null;
      })
      .addCase(getConsultInfo133.rejected, (state, action) => {
        state.loading = false;
        state.dataConsultInfo133 = [];
        state.err = action.payload.message;
      })
      .addCase(getCostConsult133.pending, (state, action) => {
        state.loading = true;
        state.dataCostConsult133 = [];
        state.err = null;
      })
      .addCase(getCostConsult133.fulfilled, (state, action) => {
        state.loading = false;
        state.dataCostConsult133 = action.payload;
        state.err = null;
      })
      .addCase(getCostConsult133.rejected, (state, action) => {
        state.loading = false;
        state.dataCostConsult133 = [];
        state.err = action.payload.message;
      })
      .addCase(getTSCD.pending, (state, action) => {
        state.loading = true;
        state.dataTSCD = [];
        state.err = null;
      })
      .addCase(getTSCD.fulfilled, (state, action) => {
        state.loading = false;
        state.dataTSCD = action.payload;
        state.err = null;
      })
      .addCase(getTSCD.rejected, (state, action) => {
        state.loading = false;
        state.dataTSCD = [];
        state.err = action.payload.message;
      })
      .addCase(getAccountTSCD.pending, (state, action) => {
        state.loading = true;
        state.dataAccountTSCD = [];
        state.err = null;
      })
      .addCase(getAccountTSCD.fulfilled, (state, action) => {
        state.loading = false;
        state.dataAccountTSCD = action.payload;
        state.err = null;
      })
      .addCase(getAccountTSCD.rejected, (state, action) => {
        state.loading = false;
        state.dataAccountTSCD = [];
        state.err = action.payload.message;
      })
      .addCase(getListIncompleteProd.pending, (state, action) => {
        state.loading = true;
        state.dataIncompleteProd = [];
        state.err = null;
      })
      .addCase(getListIncompleteProd.fulfilled, (state, action) => {
        state.loading = false;
        state.dataIncompleteProd = action.payload;
        state.err = null;
      })
      .addCase(getListIncompleteProd.rejected, (state, action) => {
        state.loading = false;
        state.dataIncompleteProd = [];
        state.err = action.payload.message;
      })
      // .addCase(getAccountantEm.pending, (state, action) => {
      //   state.loadingAccountEm = true;
      //   state.err = null;
      // })
      // .addCase(getAccountantEm.fulfilled, (state, action) => {
      //   state.loadingAccountEm = false;
      //   state.err = null;
      // })
      // .addCase(getAccountantEm.rejected, (state, action) => {
      //   state.loadingAccountEm = false;
      //   state.err = action.payload.message;
      // });   
  },
});

export const {actions, reducer} = systemSlice;
export default reducer;
