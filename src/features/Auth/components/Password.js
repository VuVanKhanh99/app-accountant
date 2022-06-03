import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function Password(props) {
  const [password, setPassword] = useState('');
  const [passVisible, setPassVisible] = useState(true);

  useEffect(()=>{
    props?.setPassword(password)
  },[password])

  return (
    <View style={styles.styleInput}>
      <Text style={styles.titleField}>Password</Text>
      <View style={{position: 'relative', width: '100%', height: '100%'}}>
        <TextInput
          placeholder="Điền mật khẩu"
          value={password}
          autoCorrect={false}
          enablesReturnKeyAutomatically
          secureTextEntry={passVisible}
          placeholderTextColor="#747575"
          underlineColorAndroid="transparent"
          onChangeText={val => setPassword(val)}
          style={styles.inputText}
        />
        <FontAwesome5 name={passVisible ? 'eye-slash': 'eye'} size={16} style={styles.eyeIcon} onPress={()=> setPassVisible(!passVisible)}/>
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
    position: 'absolute',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '21%',
    left: '91%',
    zIndex: 10
  },
});
