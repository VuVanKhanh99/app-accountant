import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ConfirmPassword(props) {
  const [confirmPass, setConfirmPass] = useState('');
  const [passVisible, setPassVisible] = useState(true);

  useEffect(()=>{
    props?.setPassCon(confirmPass)
  },[confirmPass])

  return (
    <View style={styles.styleInput}>
      <Text style={styles.titleField}>Confirm password</Text>
      <View style={styles.inputSection}>
        <TextInput
          placeholder="Điền mật khẩu"
          value={confirmPass}
          autoCorrect={false}
          enablesReturnKeyAutomatically
          secureTextEntry={passVisible}
          placeholderTextColor="#747575"
          underlineColorAndroid="transparent"
          onChangeText={val => setConfirmPass(val)}
          style={styles.inputText}
        />
        <FontAwesome5
          name={passVisible ? 'eye-slash' : 'eye'}
          size={16}
          style={styles.eyeIcon}
          onPress={() => setPassVisible(!passVisible)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleField: {
    color: '#fff',
    fontSize: 17,
    paddingLeft: 4,
    fontFamily: 'OpenSans-Medium',
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
  inputText: {
    backgroundColor: '#EAEAEA',
    fontSize: 15,
    color: '#747575',
    borderRadius: 12,
    padding: 10,
    width: '100%',
    position: 'absolute',
  },
  inputSection: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    top: '21%',
    left: '91%',
    zIndex: 10,
  },
});
