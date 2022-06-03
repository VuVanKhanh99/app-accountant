import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosClient} from '../../app/api/apiApp';
import {deleteMaterialProd} from '../CreateRequest/createReqProActions';

export const createRecipe = createAsyncThunk(
  'system/create-recipe',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {output, input, quan, unit} = params;

      const res = await axiosClient.post('system/create-recipe', {
        output,
        input,
        quantity: quan,
        unit,
      });
      const mess = res?.data?.message;
      mess && callback(res.status, mess);
      return thunkApi.dispatch(getListRecipe());
    } catch (error) {
      const messErr = error?.response.data?.message;
      thunkApi.rejectWithValue(error);
      return callback(error.response.status, messErr);
    }
  },
);

export const getListRecipe = createAsyncThunk(
  'system/list-recipe',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('system/list-recipe');
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteRecipe = createAsyncThunk(
  'system/delete-recipe',
  async (params, thunkApi) => {
    try {
      const {id} = params;
      const data = {id};
      const res = await axiosClient.delete('system/delete-recipe', {data});
      res && thunkApi.dispatch(getListRecipe());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createManagerEmployee = createAsyncThunk(
  'employee/create-manage-employee',
  async ({callbackCre, ...params}, thunkApi) => {
    try {
      const {typeEm, quantityEm} = params;

      const res = await axiosClient.post('employee/create-manage-employee', {
        typeEm,
        quantityEm,
      });

      const messApi = res && res?.data?.message;
      return thunkApi.dispatch(
        getIndexInsurance({
          callback: async mess => {
            messApi && callbackCre(res.status, messApi, mess);
          },
        }),
      );
    } catch (error) {
      const messErr = error?.response.data?.message;
      //console.log(messErr);
      thunkApi.dispatch(
        getIndexInsurance({
          callback: async mess => {
            callbackCre(error.response.status, messErr, mess);
          },
        }),
      );
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getIndexInsurance = createAsyncThunk(
  'employee/get-index-insurance',
  async ({callback}, thunkApi) => {
    try {
      const res = await axiosClient.get('employee/get-index-insurance');
      const mess = res?.data?.message;
      res && (await callback(mess));
      !mess && thunkApi.dispatch(createAccountantEm());
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createAccountantEm = createAsyncThunk(
  'employee/create-accountant-em',
  async (params, thunkApi) => {
    try {
      const resCre = await axiosClient.get('employee/create-accountant-em');
      resCre && thunkApi.dispatch(getAccountantEm());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const getAccountantEm = createAsyncThunk(
  'employee/get-accountant-ems',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('employee/get-accountant-em');
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteIndexInsurance = createAsyncThunk(
  'employee/delete-index-insurance',
  async ({callbackDel, ...params}, thunkApi) => {
    try {
      const {typeEm} = params;
      const data = {typeEm};
      const res = await axiosClient.delete('employee/delete-index-insurance', {
        data,
      });
      res &&
        thunkApi.dispatch(
          getIndexInsurance({
            callback: async mess => {
              mess && callbackDel(mess);
            },
          }),
        );
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createConsultInfo133 = createAsyncThunk(
  'employee/create-consult-info133',
  async (params, thunkApi) => {
    try {
      const resCre = await axiosClient.get('employee/create-consult-info133');
      resCre && thunkApi.dispatch(getConsultInfo133());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const getConsultInfo133 = createAsyncThunk(
  'employee/get-consult-info133',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('employee/get-consult-info133');
      res && thunkApi.dispatch(createCostConsult133());
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createCostConsult133 = createAsyncThunk(
  'employee/create-cost-consult133',
  async (params, thunkApi) => {
    try {
      const resCre = await axiosClient.get('employee/create-cost-consult133');
      resCre && thunkApi.dispatch(getCostConsult133());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const getCostConsult133 = createAsyncThunk(
  'employee/get-cost-consult133',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('employee/get-cost-consult133');
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createPeakTSCD = createAsyncThunk(
  'TSCD/create-TSCD',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {nameType, peak, payCost} = params;

      const res = await axiosClient.post('TSCD/create-TSCD', {
        nameType,
        peak,
        payCost,
      });

      const messApi = res?.data?.message;
      res && thunkApi.dispatch(getTSCD());
      return messApi && callback(res.status, messApi);
    } catch (error) {
      const messErr = error?.response.data?.message;
      thunkApi.rejectWithValue(error);
      messErr && callback(error.response.status, messErr);
    }
  },
);

export const getTSCD = createAsyncThunk(
  'TSCD/get-TSCD',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('TSCD/get-TSCD');
      res && thunkApi.dispatch(createAccountTSCD());
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createAccountTSCD = createAsyncThunk(
  'TSCD/create-account-TSCD',
  async (params, thunkApi) => {
    try {
      const resCre = await axiosClient.get('TSCD/create-account-TSCD');
      resCre && thunkApi.dispatch(getAccountTSCD());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const getAccountTSCD = createAsyncThunk(
  'TSCD/get-account-TSCD',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('TSCD/get-account-TSCD');
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteTSCD = createAsyncThunk(
  'TSCD/delete-TSCD',
  async (params, thunkApi) => {
    try {
      const {id} = params;
      const data = {id};
      const res = await axiosClient.delete('TSCD/delete-TSCD', {data});
      res && thunkApi.dispatch(getTSCD());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const getListIncompleteProd = createAsyncThunk(
  'TSCD/get-list-incomplete-prod',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('TSCD/get-list-incomplete-prod');
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createIncompleteProd = createAsyncThunk(
  'TSCD/create-incomplete-prod',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {codeReq, quantity} = params;

      const res = await axiosClient.post('TSCD/create-incomplete-prod', {
        codeReq,
        quantity,
      });

      const mess = res?.data?.message;
      mess && callback(res.status, mess);
      mess && thunkApi.dispatch(deleteMaterialProd({codeReq, deleteEm: true}));
      return thunkApi.dispatch(getListIncompleteProd());
    } catch (error) {
      const messErr = error?.response.data?.message;
      thunkApi.rejectWithValue(error);
      return callback(error.response.status, messErr);
    }
  },
);

export const deleteIncompleteProd = createAsyncThunk(
  'TSCD/delete-incomplete-prod',
  async (params, thunkApi) => {
    try {
      const {codeReq} = params;
      const data = {codeReq};
      const res = await axiosClient.delete('TSCD/delete-incomplete-prod', {
        data,
      });
      res && thunkApi.dispatch(getListIncompleteProd());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);
