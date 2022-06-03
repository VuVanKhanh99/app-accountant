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
import { typeCreateRe } from '../contants/createRequest';

function ListViewReqProduct(props) {
  const ref = useRef();
  const {arrSource, handleDel} = props;

  return (
    <View style={{flex: 1, backgroundColor: '#fff !important'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        ref={ref}>
        <KeyboardAvoidingView behavior="padding" style={styles.viewOutside}>
          <View style={styles.viewLanding}>
            <View style={styles.container}>
              <View style={styles.preView}>
                <Text style={styles.labelRow}>Tên yêu cầu</Text>
              </View>
              <View style={styles.midView}>
                <Text style={styles.labelRow}>SL</Text>
              </View>
              <View style={styles.behindView}>
                <Text style={styles.labelRow}>Thời hạn</Text>
              </View>
            </View>
            <>
              {arrSource?.length > 0 &&
                arrSource.map(item => {
                  const type = item.typeReq === typeCreateRe[0];
                  return (
                    <View style={styles.containerItem}>
                      <TouchableOpacity
                        style={styles.preView}
                        onPress={() => props?.addToList(item?.codeReq)}>
                        <Text style={styles.itemText}>
                          {item?.nameProduct}
                          <Text style={{color: type ? '#DD3C29': '#16B39E'}}>
                            ({item?.codeReq})
                          </Text>
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.midView}>
                        <Text style={styles.itemText}>{item?.quantity}</Text>
                      </View>
                      <View style={styles.behindView}>
                        <Text style={styles.itemTextPeriod1}>
                          {item.startDate}
                        </Text>
                        <FontAwesome5
                          name={'caret-right'}
                          size={17}
                          color="#5D5A5B"
                          //style={styles.deleteIcon}
                        />
                        <Text style={styles.itemTextPeriod2}>
                          {item.endDate}
                        </Text>
                      </View>
                      <View style={styles.endView}>
                        <FontAwesome5
                          name={props?.removeIcon ? 'times' : 'trash-alt'}
                          size={props?.removeIcon ? 23 : 17}
                          color={props?.removeIcon ? '#DD3C29' : '#000'}
                          //style={styles.deleteIcon}
                          onPress={() => handleDel(item?.codeReq)}
                        />
                      </View>
                    </View>
                  );
                })}
            </>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default ListViewReqProduct;

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
    paddingTop:4,
    paddingBottom:4
    //height: 35,
  },
  viewLanding: {
    padding: 10,
    width: '100%',
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
    flex: 3,
    flexWrap: 'wrap',
  },
  itemText: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
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
    width: '13%',
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
