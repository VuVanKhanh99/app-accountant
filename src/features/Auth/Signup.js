import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {LogoIcon} from '../../assets/images';
import ConfirmPassword from './components/ConfirmPassword';
import Password from './components/Password';
import Toast from 'react-native-easy-toast';
import {useNavigation} from '@react-navigation/native';
import {durableTimeMessage} from '../../app/contants/message';
import {useDispatch} from 'react-redux';
import {signupAuth, SignupAuth} from './authReducer';

export default function Signup() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passCon, setPassCon] = useState('');
  const [firstN, setFirstN] = useState('');
  const [lastN, setLastN] = useState('');

  const ref = useRef();
  const toastMes = useRef();

  useEffect(() => {
    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, []);

  const moveToLogin = () => {
    navigation.navigate('login');
  };

  const handleSubmit = () => {
    if (!username) {
      return toastMes.current.show(
        'Bạn phải điền tên đăng nhập để!',
        durableTimeMessage,
      );
    }

    if (!password) {
      return toastMes.current.show(
        'Bạn phải điền mật khẩu!',
        durableTimeMessage,
      );
    }

    if (passCon !== password) {
      return toastMes.current.show(
        'Mật khẩu xác nhận không khớp với mật khẩu!',
        durableTimeMessage,
      );
    }

    if (password.length <8) {
      return toastMes.current.show(
        'Mật khẩu phải có độ dài lớn hơn hoặc bằng 8!',
        durableTimeMessage,
      );
    }

    dispatch(
      signupAuth({
        firstN,
        lastN,
        username,
        password,
      }),
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      ref={ref}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image source={LogoIcon} style={styles.styleLogoIcon} />
        <Toast
          ref={toastMes}
          style={{backgroundColor: '#fff', padding: 10}}
          position={'center'}
          fadeInDuration={200}
          fadeOutDuration={100}
          textStyle={{color: '#83B3B3', fontSize: 15}}
        />
        <View style={styles.styleInput}>
          <Text style={styles.titleField}>Họ tên đệm</Text>
          <TextInput
            placeholder="Điền họ tên đệm"
            value={firstN}
            autoCorrect={false}
            enablesReturnKeyAutomatically
            placeholderTextColor="#747575"
            underlineColorAndroid="transparent"
            onChangeText={val => setFirstN(val)}
            style={styles.inputText}
          />
        </View>
        <View style={styles.styleInput}>
          <Text style={styles.titleField}>Tên</Text>
          <TextInput
            placeholder="Điền tên"
            value={lastN}
            autoCorrect={false}
            enablesReturnKeyAutomatically
            placeholderTextColor="#747575"
            underlineColorAndroid="transparent"
            onChangeText={val => setLastN(val)}
            style={styles.inputText}
          />
        </View>
        <View style={styles.styleInput}>
          <Text style={styles.titleField}>Tên đăng nhập</Text>
          <TextInput
            placeholder="Điền tên đăng nhập"
            value={username}
            autoCorrect={false}
            enablesReturnKeyAutomatically
            placeholderTextColor="#747575"
            underlineColorAndroid="transparent"
            onChangeText={val => setUserName(val)}
            style={styles.inputText}
          />
        </View>
        <Password setPassword={setPassword} />
        <ConfirmPassword setPassCon={setPassCon} />
        <View style={styles.otherOption}>
          <Text
            style={{
              fontSize: 16,
              color:'#fff'
            }}>
            Bạn đã có tài khoản ?
          </Text>
          <TouchableOpacity
            onPress={moveToLogin}
            style={{
              marginLeft: 3,
              fontSize: 16,
            }}>
            <Text style={{color: '#0ECFA3', fontSize: 16}}>Đăng nhập</Text>
          </TouchableOpacity>
          <Text style={{marginLeft: 4, fontSize: 16, color:"#fff"}}>luôn !</Text>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'OpenSans-Regular',
            }}>
            Đăng kí
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#5F6464',
  },
  styleLogoIcon: {
    height: 180,
    resizeMode: 'contain',
    marginTop: 100,
    marginBottom: 30,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 900,
  },
  wrapSectionInput: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 110,
    height: 120,
  },
  styleInput: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    marginTop: 10,
    height: 80,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  btnLogin: {
    width: '40%',
    height: 52,
    marginTop: 20,
    marginBottom: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 10,
    backgroundColor: '#0ECFA3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherOption: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    marginTop: 10,
  },
  titleField: {
    color: '#fff',
    fontSize: 17,
    paddingLeft: 4,
    fontFamily: 'OpenSans-Medium',
  },
  inputText: {
    backgroundColor: '#EAEAEA',
    fontSize: 15,
    color: '#747575',
    borderRadius: 12,
    padding: 10,
  },
});
