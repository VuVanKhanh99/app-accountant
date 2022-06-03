import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {LogoIcon} from '../../assets/images';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast, {DURATION} from 'react-native-easy-toast';
import {durableTimeMessage} from '../../app/contants/message';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loginAuth} from './authReducer';
import {getUser, setUser} from './setUser';

function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passVisible, setPassVisible] = useState(true);
  const [checkErr, setCheckErr] = useState(false);

  const toastMes = useRef();

  const handleLogin = async () => {
    if (!username) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền tên đăng nhập!',
        durableTimeMessage,
      );
    }

    if (!password) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền mật khẩu!',
        durableTimeMessage,
      );
    }

    await dispatch(
      loginAuth({
        username,
        password,
        callback: async (status, mess) => {
          try {
           // console.log('swdd',status);

            if (status === 201) {
              //console.log('swdd');
              navigation.navigate('bottom-tabs');
            } else {
              await setCheckErr(true);
              return toastMes.current.show(mess, durableTimeMessage);
            }
          } catch (error) {}
        },
      }),
    );

    //setCheckErr(false);
  };

  const moveToSignup = () => {
    navigation.navigate('sign-up');
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.wrapSectionInput}>
      <Image source={LogoIcon} style={styles.styleLogoIcon} />
      <Toast
        ref={toastMes}
        style={{
          backgroundColor: checkErr ? '#F22A1D' : '#33D1B8',
          padding: 10,
        }}
        position={'center'}
        fadeInDuration={200}
        fadeOutDuration={100}
        textStyle={{color: '#fff', fontSize: 15}}
      />
      <View style={styles.styleInput}>
        <Text style={styles.titleField}>Tên đăng nhập</Text>
        <TextInput
          placeholder="Điền tên đăng nhập của bạn"
          value={username}
          autoCorrect={false}
          enablesReturnKeyAutomatically
          placeholderTextColor="#747575"
          underlineColorAndroid="transparent"
          onChangeText={val => setUserName(val)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.styleInput}>
        <Text style={styles.titleField}>Mật khẩu</Text>
        <View style={{position: 'relative', width: '100%', height: '100%'}}>
          <TextInput
            placeholder="Điền mật khẩu của bạn"
            value={password}
            autoCorrect={false}
            secureTextEntry={passVisible}
            enablesReturnKeyAutomatically
            placeholderTextColor="#747575"
            underlineColorAndroid="transparent"
            onChangeText={val => setPassword(val)}
            style={styles.inputTextPass}
          />
          <FontAwesome5
            name={passVisible ? 'eye-slash' : 'eye'}
            size={16}
            style={styles.eyeIcon}
            onPress={() => setPassVisible(!passVisible)}
          />
        </View>
      </View>
      <View style={styles.otherOption}>
        <Text
          style={{
            fontSize: 16,
            color:'#fff'
          }}>
          Bạn chưa có tài khoản ?
        </Text>
        <TouchableOpacity
          onPress={moveToSignup}
          style={{
            marginLeft: 3,
            fontSize: 20,
            fontFamily: 'OpenSans-Regular',
          }}>
          <Text style={{color: '#0ECFA3', fontSize: 16}}>Đăng kí</Text>
        </TouchableOpacity>
        <Text style={{marginLeft: 5, fontSize: 16,color:'#fff'}}>ngay !</Text>
      </View>
      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Regular',
          }}>
          Đăng nhập
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1AA7A7',
  },
  wrapSectionInput: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5F6464',
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
    marginTop: 60,
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
    marginTop: 55,
  },
  titleField: {
    color: '#F4FDFD',
    fontSize: 17,
    paddingLeft: 4,
    fontFamily: 'OpenSans-Medium',
  },
  styleLogoIcon: {
    height: 180,
    resizeMode: 'contain',
    marginBottom: 60,
    paddingTop: 20,
  },
  inputText: {
    backgroundColor: '#EAEAEA',
    fontSize: 15,
    color: '#747575',
    borderRadius: 12,
    padding: 10,
  },
  inputTextPass: {
    backgroundColor: '#EAEAEA',
    fontSize: 15,
    color: '#747575',
    borderRadius: 12,
    padding: 10,
    position: 'absolute',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '21%',
    left: '91%',
    zIndex: 10,
  },
});
