import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosClient} from '../../app/api/apiApp';

export const getListProcess = createAsyncThunk(
  '/get-list-process',
  async (params, thunkApi) => {
    try {
      const dataProcess = await axiosClient.get('process/list-process');
      return dataProcess?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createProcess = createAsyncThunk(
  'create-process',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {name} = params;
      const res = await axiosClient.post('process/create-process', {name});
      res && callback(res.status, res?.data?.message);
      thunkApi.dispatch(getListProcess());
    } catch (error) {
      callback(error.response.status, error?.response?.data?.message);
      thunkApi.rejectWithValue(error);
    }
  },
);

export const getListUnit = createAsyncThunk(
  '/get-list-unit',
  async (params, thunkApi) => {
    try {
      const dataProcess = await axiosClient.get('unit/list-unit');
      return dataProcess?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createUnit = createAsyncThunk(
  '/create-unit',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {name} = params;
      const res = await axiosClient.post('unit/create-unit', {nameUnit: name});
      res && callback(res.status, res?.data?.message);
      thunkApi.dispatch(getListUnit());
    } catch (error) {
      callback(error.response.status, error?.response?.data?.message);
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteUnit = createAsyncThunk(
  '/delete-unit',
  async (params, thunkApi) => {
    try {
      const {nameUnit} = params;
      const data = {
        nameUnit,
      };
      const res = await axiosClient.delete('unit/delete-unit', {data});
      res && thunkApi.dispatch(getListUnit());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteProcess = createAsyncThunk(
  '/delete-process',
  async (params, thunkApi) => {
    try {
      const {nameProcess} = params;
      const data = {
        nameProcess,
      };
      const res = await axiosClient.delete('process/delete-process', {data});
      res && thunkApi.dispatch(getListProcess());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const createCategoryEmployee = createAsyncThunk(
  '/create-caterory-employee',
  async ({callback, ...params}, thunkApi) => {
    try {
      const {name, indexPayslip} = params;
      const res = await axiosClient.post('employee/create-caterory-employee', {
        name: name,
        indexPayslip: indexPayslip,
      });
      res && thunkApi.dispatch(getListCategoryEmployee());
      return callback(res.status, res?.data?.message);
    } catch (error) {
      callback(error.response.status, error?.response?.data?.message);
      thunkApi.rejectWithValue(error);
    }
  },
);

export const getListCategoryEmployee = createAsyncThunk(
  '/list-category-employee',
  async (params, thunkApi) => {
    try {
      const dataEmployee = await axiosClient.get(
        'employee/list-category-employee',
      );
      return dataEmployee?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteCategoryEmployee = createAsyncThunk(
  '/delete-category-employee',
  async (params, thunkApi) => {
    try {
      const {name} = params;
      const data = {
        typeEmployee: name,
      };
      const res = await axiosClient.delete(
        'employee/delete-category-employee',
        {data},
      );
      res && thunkApi.dispatch(getListCategoryEmployee());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);
