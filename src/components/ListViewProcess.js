import React, {useEffect, useRef, useState, createRef} from 'react';
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

function ListViewProcess(props) {
  const ref = useRef();
  const {codeReq, arrMaterial, arrEmployee} = props;

  const materials = arrMaterial.filter(item => item.codeReq === codeReq)[0]
    ?.materials;
  const employee = arrEmployee.filter(item => item.codeReq === codeReq)[0];
  const redant = employee?.redanduntMadeProd;
  const amountEm = employee?.amountPersonNe;
  const incompleteProd = employee?.incompleteProd;

  return (
    <View style={{backgroundColor: '#fff !important',height:'100%'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        ref={ref}>
        <KeyboardAvoidingView behavior="padding" style={styles.viewOutside}>
          <View style={styles.viewLanding}>
            {materials?.length > 0 &&
              materials.map(item => {
                //console.log(item[0]);
                return (
                  <View style={styles.viewItem}>
                    <Text
                      style={
                        styles.itemText
                      }>{`${item[0]} -> ${item[2]} (${item[3]})`}</Text>
                  </View>
                );
              })}
            {employee && (
              <View style={styles.viewItem}>
                <Text
                  style={
                    styles.itemText
                  }>{`Số lượng công nhân cần ${amountEm} người`}</Text>
                {redant ? (
                  <Text
                    style={styles.itemText}>{`Tồn ${redant} sản phẩm`}</Text>
                ) : null}
                {incompleteProd ? (
                  <Text
                    style={styles.itemText}>{`Có ${incompleteProd} dở dang`}</Text>
                ) : null}
              </View>
            )}
            {/* {employee && (
              <View style={styles.viewItem}>
                <Text>{`Số lượng công nhân cần ${amountEm} người`}</Text>
                {redant ? <Text>{`Tồn ${redant} sản phẩm`}</Text> : null}
              </View>
            )} */}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default ListViewProcess;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    backgroundColor: '#1AA7A7',
    paddingBottom: 30,
    flex: 1,
  },
  viewOutside: {},
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
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 35,
  },
  viewLanding: {
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height:130
  },
  viewItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
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
    //height:22
  },
  itemTextPeriod1: {
    fontSize: 15,
    width: '46%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#23B28E',
  },
  itemTextPeriod2: {
    fontSize: 15,
    width: '46%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#F72D0D',
  },
  // deleteIcon: {
  //   width: '100%',
  //   height: '100%',
  //   marginTop: '9%',
  //   left: '99.8%',
  //   zIndex: 10,
  // },
  preView: {
    width: '40%',
  },
  midView: {
    width: '40%',
  },
  behindView: {
    width: '42%',
    display: 'flex',
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endView: {
    width: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    marginLeft: '1%',
  },
});
