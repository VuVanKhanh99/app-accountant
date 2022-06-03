import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUser = async (token) => {
  try {
   // const token = useSelector(state => state.auth.dataLogin);
    const {accessToken, refreshToken} = JSON.parse(token);
    const dataDecode = jwt_decode(JSON.stringify(accessToken));
    const user = new Object();
    user.firstName = dataDecode?.data?.firstName;
    user.lastName = dataDecode?.data?.lastName;
    user.username = dataDecode?.data?.username;
    const userSave = await JSON.stringify(user);
    await AsyncStorage.setItem('@user-data', userSave);
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async () => {
  try {
    const item = await AsyncStorage.getItem('@user-data');
    return item
  } catch (e) {
    console.log(e);
  }
};

export const logout =async ()=>{
  try {
    await AsyncStorage.clear()
  } catch (e) {
    
  }
}