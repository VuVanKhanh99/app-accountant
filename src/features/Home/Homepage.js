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
import {loginAuth} from './authReducer';
import {getUser, setUser} from '../Auth/setUser';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function Homepage() {
  const navigation = useNavigation();
  const ref = useRef();

  const moveToItem = item => {
    item && navigation.navigate(item);
  };
  getUser()
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      ref={ref}>
      <KeyboardAvoidingView behavior="padding" style={styles.wrapSectionInput}>
        <View style={styles.topView}>
          <Image source={LogoIcon} style={styles.styleLogoIcon} />
        </View>
        <View style={styles.viewAction}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => moveToItem('create-request')}>
            <View style={styles.viewItem}>
              <FontAwesome5
                name="book"
                size={23}
                style={{color: '#fff'}}
              />
              <Text style={styles.textTitle}>Tạo yêu cầu sản xuất</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => moveToItem('plan-process-product')}>
            <View style={styles.viewItem}>
              <FontAwesome5
                name="calendar-alt"
                size={23}
                style={{color: '#fff'}}
              />
              <Text style={styles.textTitle}>Kế hoạch vật tư</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => moveToItem('manage-accountant-product')}
            >
            <View style={styles.viewItemEnd}>
              <FontAwesome5 name="money-check" size={23} style={{color: '#fff'}} />
              <Text style={styles.textTitle}>Kế toán chi phí</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Homepage;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  styleLogoIcon: {
    height: 90,
    resizeMode: 'contain',
  },
  topView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 150,
    backgroundColor: '#1AA7A7',
  },
  textTitle:{
    fontSize:16,
    fontFamily:'Montserrat-SemiBold',
    color:"#fff"
  },
  viewAction: {
    marginTop: 300,
    padding: 30,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewItem: {
    width: 190,
    height: 80,
    shadowColor: '#10554A',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    borderRadius: 10,
    elevation: 13,
    backgroundColor: '#1AA7A7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewItemEnd: {
    width: 190,
    height: 80,
    shadowColor: '#10554A',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    borderRadius: 10,
    elevation: 13,
    backgroundColor: '#1AA7A7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10
  },
});
