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
import {LogoIcon} from '../../assets/images';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
import {durableTimeMessage} from '../../app/contants/message';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

function Categories() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toastMes = useRef();
  const ref = useRef();

  const moveToItem = (item) => {
      item && navigation.navigate(item)
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      ref={ref}>
      <KeyboardAvoidingView behavior="padding" style={styles.wrapSectionInput}>
        <View style={styles.container}>
          {/* <TouchableOpacity
            style={styles.item1}
            activeOpacity={0.9}
            onPress={moveToItem}>
            <View>
              <Text style={styles.titleView}>Danh mục kho</Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.item1, styles.item2]}
            onPress={() => moveToItem('create-unit')}
            activeOpacity={0.9}>
            <View>
              <Text style={styles.titleView}>Danh mục đơn vị</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.item1, styles.item3]}
            onPress={() => moveToItem('create-process')}
            activeOpacity={0.9}>
            <View>
              <Text style={styles.titleView}>Công đoạn</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.item1, styles.item5]}
            onPress={() => moveToItem('list-employee')}
            activeOpacity={0.9}>
            <View>
              <Text style={styles.titleView}>Nhân viên</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.item1, styles.item4]}
            activeOpacity={0.9}>
            <View>
              <Text style={styles.titleView}>Danh mục lỗi</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Categories;

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
    backgroundColor: '#26C6C6',
    height: 100,
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  item2: {
    backgroundColor: '#126F79',
  },
  item3: {
    backgroundColor: '#86441E',
  },
  item4:{
      backgroundColor:'#ED6641'
  },
  item5:{
    backgroundColor: '#587578',
  },
  titleView: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
});
