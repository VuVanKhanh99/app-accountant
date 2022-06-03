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

function ListViewIncompleteProd(props) {
  const ref = useRef();
  const {arrSource, arrView, handleDelete} = props;
  
  return (
    <View
      style={{
        flex: 1,
        height: 250,
        backgroundColor: '#fff !important',
        marginTop: 50,
        width: '105%',
        marginLeft: '-2.3%',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        ref={ref}>
        <KeyboardAvoidingView behavior="padding" style={styles.viewOutside}>
          <View style={styles.viewLanding}>
            <View style={styles.container}>
              <View style={styles.preView}>
                <Text style={styles.labelRow}>Đơn hàng</Text>
              </View>
              <View style={styles.behindView}>
                <Text style={styles.labelRow}>Số lượng SPDD</Text>
              </View>
            </View>
            <>
              {arrSource?.length > 0 &&
                arrSource.map(item => {
                  const check = arrView.filter(val => val.codeReq === item.codeReq)[0];
                  return (
                    <View style={styles.containerItem}>
                      <View style={styles.preView}>
                        <Text style={styles.itemText}>{check?.nameProduct} ({check?.codeReq})</Text>
                      </View>
                      <View style={styles.behindView}>
                        <Text style={styles.itemText}>
                          {item.quantity}
                        </Text>
                      </View>
                      <View style={styles.endView}>
                        <FontAwesome5
                          name={'trash-alt'}
                          size={17}
                          color="#000"
                          //style={styles.deleteIcon}
                          onPress={() => handleDelete(check?.codeReq)}
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

export default ListViewIncompleteProd;

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
    height: 35,
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
  },
  itemText: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  // deleteIcon: {
  //   width: '100%',
  //   height: '100%',
  //   marginTop: '9%',
  //   left: '99.8%',
  //   zIndex: 10,
  // },
  preView: {
    width: '50%',
  },
  behindView: {
    width: '38%',
  },
  endView: {
    width: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    marginLeft: '6.5%',
  },
});
