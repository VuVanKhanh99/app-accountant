import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {getToListName} from '../utils/function';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function ListViewInsurance(props) {
  const {arrSource, handleDelete} = props;
  const ref = useRef();


  return (
    <View style={{flex: 1, height: 500,marginBottom:50}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        ref={ref}>
        <KeyboardAvoidingView behavior="padding" style={styles.viewOutside}>
          <View style={styles.viewLanding}>
            <View style={styles.container}>
              <View style={styles.preView}>
                <Text style={styles.labelRow}>Tên</Text>
              </View>
              <View style={styles.midView}>
                <Text style={styles.labelRow}>SL</Text>
              </View>
              <View style={styles.behindView}>
                <Text style={styles.labelRow}>BHXH</Text>
              </View>
              <View style={styles.endView}>
                <Text style={styles.labelRow}>BHYT</Text>
              </View>
              <View style={styles.mnView}>
                <Text style={styles.labelRow}>BHTN</Text>
              </View>
            </View>
            <>
              {arrSource?.length > 0 &&
                arrSource.map(item => (
                  <View style={styles.containerItem}>
                    <View style={styles.preView}>
                      <Text style={styles.itemText}>{item?.typeEm}</Text>
                    </View>
                    <View style={styles.midView}>
                      <Text
                        style={
                          styles.itemText
                        }>{item?.quantityEm}</Text>
                    </View>
                    <View style={styles.behindView}>
                      <Text style={styles.itemText}>{item?.BHXH}</Text>
                    </View>
                    <View style={styles.endView}>
                      <Text style={styles.itemTextPrice}>{item?.BHYT}</Text>
                    </View>
                    <View style={styles.mnView}>
                      <Text style={styles.itemTextPrice}>{item?.BHTN}</Text>
                      <FontAwesome5
                        name={'trash-alt'}
                        size={17}
                        color="#000"
                        style={styles.deleteIcon}
                        onPress={() => handleDelete(item?.typeEm)}
                      />
                    </View>
                  </View>
                ))}
            </>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default ListViewInsurance;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    backgroundColor: '#1AA7A7',
    paddingBottom: 30,
    flex: 1,
  },
  viewOutside: {
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    // marginBottom: 10,
  },
  containerItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexWrap:'wrap',
    //height: 35,
    paddingBottom:1.5
  },
  viewLanding: {
    padding: 12,
    width: '120%',
    backgroundColor: '#fff',
  },
  viewItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    height: 60,
  },
  labelRow: {
    fontSize: 16,
    width: '100%',
    fontFamily: 'OpenSans-Bold',
    //  fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  itemText: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  itemTextPrice: {
    fontSize: 15,
    width: '70%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
    position:'absolute'
  },
  deleteIcon: {
    width: '20%',
    height: '100%',
    top:'20%',
    position:'absolute',
    left: '55%',
  },
  preView: {
    width: '37%',
  },
  midView: {
    width: '10%',
  },
  behindView: {
    width: '10%',
  },
  endView: {
    width: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    position:'relative'
  },
  mnView:{
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    position:'relative'
  }
});
