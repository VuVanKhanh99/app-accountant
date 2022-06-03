import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

function System() {
  const navigation = useNavigation();
  const ref = useRef();
  const dispatch = useDispatch();
  const moveToItem = item => {
    item && navigation.navigate(item);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    await dispatch({type: 'auth/logout'});
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      ref={ref}>
      <KeyboardAvoidingView behavior="padding" style={styles.wrapSectionInput}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.item1}
            activeOpacity={0.9}
            onPress={() => moveToItem('exchange-material')}>
            <View>
              <Text style={styles.titleView}>Định mức quy đổi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.item1, styles.item2]}
            activeOpacity={0.9}
            onPress={() => moveToItem('manage-insurances')}>
            <View>
              <Text style={styles.titleView}>Nhân viên</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.item1, styles.item4]}
            activeOpacity={0.9}
            onPress={() => moveToItem('TSCD')}>
            <View>
              <Text style={styles.titleView}>Khấu hao tài sản cố định</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.item1, styles.item6]}
            activeOpacity={0.9}
            onPress={() => moveToItem('incomplete-prod')}>
            <View>
              <Text style={styles.titleView}>Kế toán sản phẩm dở dang</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemLogout}
            activeOpacity={0.9}
            onPress={handleLogout}>
            <View>
              <Text style={styles.titleLogout}>Đăng xuất</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default System;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 60,
  },
  item1: {
    width: '90%',
    backgroundColor: '#24796D',
    height: 100,
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  item2: {
    backgroundColor: '#EA0906',
  },
  item3: {
    backgroundColor: '#86441E',
  },
  item4: {
    backgroundColor: '#587578',
  },
  item6: {
    backgroundColor: '#12A0C6',
  },
  titleView: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  titleLogout: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Montserrat-SemiBold',
  },
  itemLogout: {
    width: '90%',
    backgroundColor: '#28A2A6',
    height: 40,
    marginTop: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
