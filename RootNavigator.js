import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/features/Auth/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from './src/features/Auth/Signup';
import BottomTab from './src/navigator/BottomTab';
import Item from './src/features/Material/components/Item';
import CreateProcess from './src/features/Category/Process/CreateProcess';
import CreateUnit from './src/features/Category/Unit/CreateUnit';
import PriceExchange from './src/features/Material/PriceExchange/PriceExChange';
import StuffExchange from './src/features/Material/StuffExchange/StuffExchange';
import ListEmployee from './src/features/Category/Employee/ListEmployee';
import ExchangeMaterial from './src/features/System/ExchangeMaterial';
import ManageInsurance from './src/features/System/Employee/Employee';
import TSCD from './src/features/System/TSCD/TSCD';
import CreateRequest from './src/features/CreateRequest/CreateRequest';
import PlanProcessProduct from './src/features/CreateRequest/PlanProcessProduct';
import ListMaterialItem from './src/features/Material/ListMaterialItem.js/ListMaterialItem';
import AccountantProduct from './src/features/Home/AccountantProduct/AccountantProduct';
import {getUser} from './src/features/Auth/setUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import IncompleteProd from './src/features/System/IncompleteProd/IncompleteProd';

function RootNavigator() {
  const loginData = useSelector(state => state.auth.dataLogin);
  const checkLogin = Object.keys(loginData).length === 0 ? null : JSON.parse(loginData)?.accessToken;
  // const check = typeof loginData === 'object' && loginData !== null;
  // const checkLogin = check ? JSON.parse(loginData)?.accessTokenJSON.parse(loginData)?.accessToken : null;

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="bottom-tabs">
        <Stack.Screen
          name="manage-accountant-product"
          component={checkLogin ? AccountantProduct : Login}
        />
        <Stack.Screen
          name="manage-materials"
          component={checkLogin ? ListMaterialItem : Login}
        />
        <Stack.Screen
          name="plan-process-product"
          component={checkLogin ? PlanProcessProduct : Login}
        />
        <Stack.Screen name="TSCD" component={checkLogin ? TSCD : Login} />
        <Stack.Screen
          name="material-item"
          component={checkLogin ? Item : Login}
        />
        <Stack.Screen
          name="create-process"
          component={checkLogin ? CreateProcess : Login}
        />
        <Stack.Screen
          name="create-unit"
          component={checkLogin ? CreateUnit : Login}
        />
        <Stack.Screen
          name="bottom-tabs"
          component={checkLogin ? BottomTab : Login}
        />
        <Stack.Screen
          name="price-materials"
          component={checkLogin ? PriceExchange : Login}
        />
        <Stack.Screen
          name="price-stuff"
          component={checkLogin ? StuffExchange : Login}
        />
        <Stack.Screen
          name="list-employee"
          component={checkLogin ? ListEmployee : Login}
        />
        <Stack.Screen
          name="exchange-material"
          component={checkLogin ? ExchangeMaterial : Login}
        />
        <Stack.Screen
          name="manage-insurances"
          component={checkLogin ? ManageInsurance : Login}
        />
        <Stack.Screen
          name="create-request"
          component={checkLogin ? CreateRequest : Login}
        />
        <Stack.Screen name="incomplete-prod" component={IncompleteProd}/>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="sign-up" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
