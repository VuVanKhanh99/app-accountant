import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosClient} from '../../app/api/apiApp';

export const createNewReqProduct = createAsyncThunk(
  'req-product/create-new-req',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {codeReq, product, statusReq, quanTity, dayStart, dayEnd, typeReq} =
        params;

      const obj = JSON.stringify({
        codeReq,
        product,
        statusReq,
        quanTity,
        dayStart,
        dayEnd,
        typeReq,
      });

      const res = await axiosClient.post('/req-product/create-new-req', {obj});

      const mess = res?.data?.message;
      return callback(res.status, mess);
    } catch (error) {
      const messErr = error?.response.data?.message;
      thunkApi.rejectWithValue(error);
      return callback(error.response.status, messErr);
    }
  },
);

export const getListReqProduct = createAsyncThunk(
  'req-product/list-req-product',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('req-product/list-req-product');
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteReqProduct = createAsyncThunk(
  'req-product/delete-request-product',
  async (params, thunkApi) => {
    try {
      const {codeReq} = params;
      const data = {codeReq};
      const res = await axiosClient.delete(
        'req-product/delete-request-product',
        {data},
      );
      res && thunkApi.dispatch(getListReqProduct());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createDataProcessProd = createAsyncThunk(
  'req-product/calcalator-process-product',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {product, codeReq, amount} = params;
      const res = await axiosClient.post(
        'req-product/calcalator-process-product',
        {product, codeReq, amount, incompleteProd: params?.incompleteProd},
      );
      thunkApi.dispatch(getDataMaterialProd());
      res && callback(res.status);
      return res && thunkApi.dispatch(getInfoMaterialProd({codeReq}));
    } catch (error) {
      const messErr = error?.response.data?.message;
      thunkApi.rejectWithValue(error);
      return callback(error.response.status, messErr);
    }
  },
);

export const getInfoMaterialProd = createAsyncThunk(
  'req-product/get-info-material-prod',
  async (params, thunkApi) => {
    try {
      const {codeReq} = params;
      const res = await axiosClient.get(
        `req-product/get-info-material-prod/${codeReq}`,
      );
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createDataEmProd = createAsyncThunk(
  'req-product/calcalator-employee-product',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {product, amount, date, codeReq} = params;
      const res = await axiosClient.post(
        'req-product/calcalator-employee-product',
        {product, amount, date, codeReq},
      );
      thunkApi.dispatch(getDataEmployeelProd());
      thunkApi.dispatch(getDataMaterialProd());
      return res && thunkApi.dispatch(getInfoMaterialProd({codeReq}));
    } catch (error) {
      const messErr = error?.response.data?.message;
      if (messErr) {
        callback(error.response.status, messErr);
        thunkApi.dispatch(getDataMaterialProd());
        thunkApi.dispatch(getInfoMaterialProd({codeReq}));
      }
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getInfoEmProd = createAsyncThunk(
  'req-product/get-info-employee-prod',
  async (params, thunkApi) => {
    try {
      const {codeReq} = params;
      const res = await axiosClient.get(
        `req-product/get-info-employee-prod/${codeReq}`,
      );
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const getDataMaterialProd = createAsyncThunk(
  'req-product/get-data-material',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('req-product/get-data-material');
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const getDataEmployeelProd = createAsyncThunk(
  'req-product/get-data-employee',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('req-product/get-data-employee');
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteMaterialProd = createAsyncThunk(
  'req-product/delete-material-req',
  async (params, thunkApi) => {
    try {
      const {codeReq} = params;
      const data = {codeReq};
      const res = await axiosClient.delete('req-product/delete-material-req', {
        data,
      });
      res &&
        !params?.deleteEm &&
        thunkApi.dispatch(deleteEmployeeProd({codeReq}));
      res && thunkApi.dispatch(getListReqProduct());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteEmployeeProd = createAsyncThunk(
  'req-product/delete-employee-req',
  async (params, thunkApi) => {
    try {
      const {codeReq} = params;
      const data = {codeReq};
      const res = await axiosClient.delete('req-product/delete-employee-req', {
        data,
      });
      res && thunkApi.dispatch(getListReqCurrent());
      res && thunkApi.dispatch(getListReqProduct());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const getListReqCurrent = createAsyncThunk(
  'req-product/get-list-req-current',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('req-product/get-list-req-current');
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const calculAccountProd = createAsyncThunk(
  'req-product/calcul-account-product',
  async (params, thunkApi) => {
    try {
      const {codeReq} = params;
      const res = await axiosClient.post('req-product/calcul-account-product', {
        codeReq,
      });
     // console.log(res?.data?.data);
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const updateEmProd = createAsyncThunk(
  'req-product/update-em-prod',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {codeReq, incompleteProd} = params;
      const res = await axiosClient.post('req-product/update-em-prod', {
        codeReq,
        incompleteProd,
      });
      res && callback(res?.status, res?.data?.message)
    } catch (error) {
      const messErr = error?.response.data?.message;
      if (messErr) {
        callback(error.response.status, messErr);
      }
      return thunkApi.rejectWithValue(error);
    }
  },
);
