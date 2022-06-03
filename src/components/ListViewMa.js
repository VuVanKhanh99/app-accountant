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
import {useDispatch, useSelector} from 'react-redux';
import {getListMaterials, deleteMaterial} from '../materialActions';
import Toast from 'react-native-easy-toast';
import {durableTimeMessage} from '../../../app/contants/message';

function ListViewMa(props) {
  const {dataMaterial, handleDelete} = props;

  return (
    <View style={styles.viewLanding}>
      <View style={styles.container}>
        <View style={styles.preView}>
          <Text style={styles.labelRow}>Vật tư</Text>
        </View>
        <View style={styles.midView}>
          <Text style={styles.labelRowCenter}>Đơn vị</Text>
        </View>
        <View style={styles.unitView}>
          <Text style={styles.labelRowCenter}>Nhân công</Text>
        </View>
        <View style={styles.endView}>
          <Text style={styles.labelRow}>Thời gian</Text>
        </View>
      </View>
      <>
        {dataMaterial?.length > 0 &&
          dataMaterial.map(item => (
            <View style={styles.containerItem}>
              <View style={styles.preView}>
                <Text style={styles.itemText}>{item?.name}</Text>
              </View>
              <View style={styles.midView}>
                <Text style={styles.itemTextCenter}>{item?.unit}</Text>
              </View>
              <View style={styles.unitView}>
                <Text style={styles.itemTextCenter}>{item?.amountPerson}</Text>
              </View>
              <View style={styles.endView}>
                <Text style={styles.textTime}>
                  {item?.durable ? `${item?.durable} phút` : null}
                </Text>
                <FontAwesome5
                  name={'trash-alt'}
                  size={17}
                  color="#000"
                  style={styles.deleteIcon}
                  onPress={() => handleDelete(item?.name)}
                />
              </View>
            </View>
          ))}
      </>
    </View>
  );
}

export default ListViewMa;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    backgroundColor: '#1AA7A7',
    paddingBottom: 30,
    flex: 1,
  },
  containerOut: {
    width: '100%',
  },
  viewOutside: {
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 67,
    // marginBottom: 10,
  },
  containerItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    //height: 40,
    paddingBottom: 1.5,
    marginTop: 4,
    paddingTop: 5,
    paddingBottom: 5,
  },
  titleItem: {
    fontSize: 22,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    color: '#fff',
    marginBottom: 30,
    padding: 10,
    marginTop: 30,
  },
  viewLanding: {
    padding: 10,
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
  unitView: {
    width: '18%',
    display: 'flex',
    justifyContent: 'center',
  },
  labelRow: {
    fontSize: 16,
    width: '100%',
    fontFamily: 'OpenSans-Bold',
    flexWrap: 'wrap',
    //  fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  labelRowCenter: {
    fontSize: 16,
    width: '100%',
    fontFamily: 'OpenSans-Bold',
    //  fontFamily: 'OpenSans-Regular',
    color: '#000',
    textAlign: 'center',
  },
  itemText: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  textTime: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    color: '#000',
    left: '10%',
    position: 'absolute',
  },
  itemTextCenter: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
    textAlign: 'center',
  },
  itemTextPrice: {
    fontSize: 15,
    width: '70%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
    position: 'absolute',
  },
  deleteIcon: {
    width: '10%',
    height: '100%',
    top: '20%',
    position: 'absolute',
    left: '68%',
  },
  preView: {
    width: '30%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  midView: {
    width: '13%',
  },
  endView: {
    width: '28%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    left: '1%',
  },
  viewRedundant: {
    width: '5%',
  },
});
