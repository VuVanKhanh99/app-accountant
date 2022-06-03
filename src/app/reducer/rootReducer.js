import {combineReducers} from 'redux';
import authSlice from '../../features/Auth/authReducer';
import materialSlice from '../../features/Material/materialReducer';
import categoriSlice from '../../features/Category/categoriReducer';
import systemSlice from '../../features/System/systemReducer';
import createReqProduct from '../../features/CreateRequest/createReqProReducer';

const combineReducer = combineReducers({
  auth: authSlice,
  material: materialSlice,
  category: categoriSlice,
  system: systemSlice,
  reqProduct: createReqProduct
});

export default combineReducer;
