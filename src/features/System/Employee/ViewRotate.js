import React, {useState, useRef, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import {BHXHIcon} from '../../../assets/images';

function ViewRotate() {
  const spinValue = new Animated.Value(0);

  spinValue.setValue(0)
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 16000,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: false, // To make use of native driver for performance
    }),
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={{
        width: 180,
        height: 180,
        marginTop: 5,
        borderRadius: 30,
      }}>
      {/* <Image source={BHXHIcon} style={styles.imgIcon} /> */}
      <Animated.Image
        style={{
          transform: [{rotate: spin}],
          width: '100%',
          height: '100%',
          objectFit: 'contain',

          borderBottomLeftRadius: 90,
          borderBottomRightRadius: 90,
          borderTopRightRadius: 90,
          borderTopLeftRadius: 90,
          overflow: 'hidden',
        }}
        source={BHXHIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imgIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',

    borderBottomLeftRadius: 95,
    borderBottomRightRadius: 95,
    borderTopRightRadius: 75,
    borderTopLeftRadius: 75,
    overflow: 'hidden',
  },
  viewIcon: {
    width: 150,
    height: 150,
    marginTop: 40,
    borderRadius: 30,
  },
});

export default ViewRotate;
