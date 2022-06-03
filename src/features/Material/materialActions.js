import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosClient} from '../../app/api/apiApp';

export const addMaterial = createAsyncThunk(
  'add-item',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {
        name,
        type,
        code,
        unit,
        redundantThe,
        redundantRe,
        process,
        durable,
        person,
      } = params;

      const obj = JSON.stringify({
        name,
        type,
        code,
        unit,
        redundantThe,
        redundantRe,
        process,
        durable,
        amountPerson: person,
      });

      const res = await axiosClient.post('/material/add-new', {obj});

      const mess = res?.data?.message;
      thunkApi.dispatch(getListMaterials());
      return callback(res.status, mess);
    } catch (error) {
      const messErr = error?.response.data?.message;
      thunkApi.rejectWithValue(error);
      return callback(error.response.status, messErr);
    }
  },
);

export const getListMaterials = createAsyncThunk(
  'material/get-list',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('material/list-material');
      return res.data.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createItemPrice = createAsyncThunk(
  'material/price-item',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {name, price, unit} = params;

      const res = await axiosClient.post('material/price-item', {
        name,
        price,
        unit,
      });
      const mess = res?.data?.message;
      mess && thunkApi.dispatch(getListPriceItem());
      return callback(res.status, mess);
    } catch (error) {
      const messErr = error?.response.data?.message;
      thunkApi.rejectWithValue(error);
      return callback(error.response.status, messErr);
    }
  },
);

export const getListPriceItem = createAsyncThunk(
  'material/list-price-item',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('material/list-price-item');
      return res.data.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deletePriceItem = createAsyncThunk(
  'material/delete-price-item',
  async (params, thunkApi) => {
    try {
      const {nameItem} = params;
      const data = {nameItem};
      const res = await axiosClient.delete('material/delete-price-item', {
        data,
      });
      res && thunkApi.dispatch(getListPriceItem());
      return res.data.message;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteMaterial = createAsyncThunk(
  'material/delete-material',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {name} = params;
      const data = {name};
      const res = await axiosClient.delete('material/delete-material', {
        data,
      });
      res && thunkApi.dispatch(getListMaterials());
      return callback(res.status, mess);
    } catch (error) {
      const messErr = error?.response.data?.message;
      callback(error.response.status, messErr);

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const createPriceStuff = createAsyncThunk(
  'material/price-stuff',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {name, price, quantity, unit} = params;

      const res = await axiosClient.post('material/price-stuff', {
        name,
        price,
        quantity,
        unit,
      });
      const mess = res?.data?.message;
      mess && thunkApi.dispatch(getListPriceStuff());
      return callback(res.status, mess);
    } catch (error) {
      const messErr = error?.response.data?.message;
      thunkApi.rejectWithValue(error);
      return callback(error.response.status, messErr);
    }
  },
);

export const getListPriceStuff = createAsyncThunk(
  'material/list-price-stuff',
  async (params, thunkApi) => {
    try {
      const res = await axiosClient.get('material/list-price-stuff');
      return res.data.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deletePriceStuff = createAsyncThunk(
  'material/delete-price-stuff',
  async (params, thunkApi) => {
    try {
      const {nameStuff} = params;
      const data = {nameStuff};
      const res = await axiosClient.delete('material/delete-price-stuff', {
        data,
      });
      res && thunkApi.dispatch(getListPriceStuff());
      return res.data.message;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);
