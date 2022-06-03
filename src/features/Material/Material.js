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

function Material() {
  const navigation = useNavigation();
  const ref = useRef();

  const moveToItem = item => {
    item && navigation.navigate(item);
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
            onPress={() => moveToItem('material-item')}>
            <View>
              <Text style={styles.titleView}>Vật tư quy đổi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.item1, styles.item2]}
            activeOpacity={0.9}
            onPress={() => moveToItem('price-materials')}>
            <View>
              <Text style={styles.titleView}>Kê khai nguyên liệu</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.item1, styles.item4]}
            activeOpacity={0.9}
            onPress={() => moveToItem('price-stuff')}>
            <View>
              <Text style={styles.titleView}>Thống kê vật liệu phụ</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.item1, styles.item3]}
            activeOpacity={0.9}
            onPress={() => moveToItem('manage-materials')}>
            <View>
              <Text style={styles.titleView}>Quản lý vật tư</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Material;

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
  item4: {
    backgroundColor: '#587578',
  },
  titleView: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
});
