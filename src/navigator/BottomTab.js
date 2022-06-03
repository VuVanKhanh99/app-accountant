import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Homepage from '../features/Home/Homepage';
import Material from '../features/Material/Material';
import Categories from '../features/Category/Categories';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import System from '../features/System/System';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          left: 20,
          right: 20,
          elevation: 0,
          bottom: 25,
          backgroundColor: '#fff',
          borderRadius: 25,
          height: 76,
          ...styles.shadow,
        },
        tabBarPosition: 'bottom',
      }}
      initialRouteName="home-page">
      <Tab.Screen
        name="home-page"
        component={Homepage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.viewIcon}>
              <IconFontAwesome
                name="home"
                size={23}
                style={{
                  color: focused ? '#e32f45' : '#595758',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#595758',
                  fontFamily:"OpenSans-SemiBold"
                }}>
                Trang chủ
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="material"
        component={Material}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.viewIcon}>
              <IconFontAwesome
                name="arrows"
                size={23}
                style={{
                  color: focused ? '#e32f45' : '#595758',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#595758',
                  fontFamily:"OpenSans-SemiBold"
                }}>
                Vật liệu
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="category"
        component={Categories}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.viewIcon}>
              <IconFontAwesome
                name="align-justify"
                size={23}
                style={{
                  color: focused ? '#e32f45' : '#595758',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#595758',
                  fontFamily:"OpenSans-SemiBold"
                }}>
                Danh mục
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="system"
        component={System}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.viewIcon}>
              <IconFontAwesome
                name="cog"
                size={23}
                style={{
                  color: focused ? '#e32f45' : '#595758',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#595758',
                  fontFamily:"OpenSans-SemiBold"
                }}>
                  Hệ thống
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  viewIcon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default BottomTab;
