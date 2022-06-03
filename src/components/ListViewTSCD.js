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
import {listTypeTSCD} from '../contants/listNamTypeEmployee';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {convertCurrencyToNumber, formartToCurrency} from '../utils/function';

function ListViewTSCD(props) {
  const {arrList, arrTotal, handleDel} = props;
  const ref = useRef();
  const check1 = arrList.filter(item => item?.typeTSCD === listTypeTSCD[0]);
  const check2 = arrList.filter(item => item?.typeTSCD === listTypeTSCD[1]);
  const check3 = arrList.filter(item => item?.typeTSCD === listTypeTSCD[2]);
  const total1 =
    arrTotal.filter(item => item?.typeTSCD === listTypeTSCD[0])[0]?.totalPeak ||
    0;
  const total2 =
    arrTotal.filter(item => item?.typeTSCD === listTypeTSCD[1])[0]?.totalPeak ||
    0;
  const total3 =
    arrTotal.filter(item => item?.typeTSCD === listTypeTSCD[2])[0]?.totalPeak ||
    0;
  const total214 =
    +convertCurrencyToNumber(total1) +
    +convertCurrencyToNumber(total2) +
    +convertCurrencyToNumber(total3);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        //style={styles.scrollView}
        ref={ref}>
        <>
          {check1?.length > 0 && (
            <View style={styles.itemMap}>
              <Text style={styles.titleItem}>{listTypeTSCD[0]}</Text>
              <View style={styles.viewItems}>
                {check1.map(item => (
                  <View style={styles.viewItem}>
                    <Text style={styles.textItem}>{item?.peak}</Text>
                    <View style={styles.viewIcon}>
                      <Text style={styles.textItem}>{`${item?.payCost}đ`}</Text>
                      <FontAwesome5
                        name={'trash-alt'}
                        size={17}
                        color="#000"
                        style={styles.deleteIcon}
                        onPress={() => handleDel(item?._id)}
                      />
                    </View>
                  </View>
                ))}
                <View style={styles.totalItem}>
                  <Text style={styles.specialText}>Tổng</Text>
                  <Text style={styles.specialText}>{`${total1}đ`}</Text>
                </View>
              </View>
            </View>
          )}
          {check2?.length > 0 && (
            <View style={styles.itemMap}>
              <Text style={styles.titleItem}>{listTypeTSCD[1]}</Text>
              <View style={styles.viewItems}>
                {check2.map(item => (
                  <View style={styles.viewItem}>
                    <Text style={styles.textItem}>{item?.peak}</Text>
                    <View style={styles.viewIcon}>
                      <Text style={styles.textItem}>{`${item?.payCost}đ`}</Text>
                      <FontAwesome5
                        name={'trash-alt'}
                        size={17}
                        color="#000"
                        style={styles.deleteIcon}
                        onPress={() => handleDel(item?._id)}
                      />
                    </View>
                  </View>
                ))}
                <View style={styles.totalItem}>
                  <Text style={styles.specialText}>Tổng</Text>
                  <Text style={styles.specialText}>{`${total2}đ`}</Text>
                </View>
              </View>
            </View>
          )}
          {check3?.length > 0 && (
            <View style={styles.itemMap}>
              <Text style={styles.titleItem}>{listTypeTSCD[2]}</Text>
              <View style={styles.viewItems}>
                {check3.map(item => (
                  <View style={styles.viewItem}>
                    <Text style={styles.textItem}>{item?.peak}</Text>
                    <View style={styles.viewIcon}>
                      <Text style={styles.textItem}>{`${item?.payCost}đ`}</Text>
                      <FontAwesome5
                        name={'trash-alt'}
                        size={17}
                        color="#000"
                        style={styles.deleteIcon}
                        onPress={() => handleDel(item?._id)}
                      />
                    </View>
                  </View>
                ))}
                <View style={styles.totalItem}>
                  <Text style={styles.specialText}>Tổng</Text>
                  <Text style={styles.specialText}>{`${total3}đ`}</Text>
                </View>
              </View>
            </View>
          )}
        </>
      </ScrollView>
      <View style={styles.viewAccountant}>
        <Text style={styles.desCost}>Hạch toán theo thông tư 133</Text>
        {check1?.length > 0 && (
          <View style={styles.viewItemAccount}>
            <View style={styles.red334}>
              <Text style={styles.text334}>Nợ TK – 154</Text>
            </View>
            <Text style={styles.textMoneyRed}>
              {'  '}
              {`${total1}đ`}
            </Text>
          </View>
        )}
        {check2?.length > 0 && (
          <View style={styles.viewItemAccount}>
            <View style={styles.red334}>
              <Text style={styles.text334}>Nợ TK - 6421</Text>
            </View>
            <Text style={styles.textMoneyRed}>
              {'  '}
              {`${total2}đ`}
            </Text>
          </View>
        )}
        {check3?.length > 0 && (
          <View style={styles.viewItemAccount}>
            <View style={styles.red334}>
              <Text style={styles.text334}>Nợ TK - 6422</Text>
            </View>
            <Text style={styles.textMoneyRed}>
              {'  '}
              {`${total3}đ`}
            </Text>
          </View>
        )}
        <View style={styles.viewItemAccount}>
          <View style={styles.green3383}>
            <Text style={styles.text334}>Có TK – 214</Text>
          </View>
          <Text style={styles.textMoneyGreen}>
            {'  '}
            {`${formartToCurrency(total214)}đ`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: 650,
    width: '110%',
    marginLeft: '-5%',
    padding: 20,
  },
  red334: {
    backgroundColor: '#F72D0D',
    padding: 4,
    borderRadius: 3,
    width: '55%',
  },
  itemMap: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 18,
    backgroundColor: '#2973A7',
    padding: 20,
    borderRadius: 5,
  },
  titleItem: {
    fontSize: 17.5,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
  deleteIcon: {
    color: '#FFF',
    marginTop: 1,
  },
  green3383: {
    backgroundColor: '#23B28E',
    padding: 4,
    borderRadius: 3,
    width: '55%',
  },
  viewAccountant: {
    backgroundColor: '#fff',
    width: '100%',
    height: 190,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
    paddingBottom: 50,
    marginTop: 30,
  },
  text334: {
    color: '#fff',
    fontFamily: 'OpenSans-Medium',
  },
  desCost: {
    marginBottom: 15,
    paddingTop: 13,
    fontSize: 17,
    color: '#964D45',
    fontFamily: 'OpenSans_SemiCondensed-Italic',
  },
  textMoneyRed: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    width: '50%',
    flex: 3,
    alignItems: 'center',
    flexWrap: 'nowrap',
    color: '#F72D0D',
    justifyContent: 'center',
  },
  textMoneyGreen: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    width: '48%',
    flex: 7,
    alignItems: 'center',
    flexWrap: 'nowrap',
    color: '#23B28E',
  },
  viewItemAccount: {
    marginTop: 10,
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewIcon: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 110,
    marginRight: -20,
  },
  specialText: {
    fontSize: 15.2,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
  viewItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:5
  },
  totalItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  viewItems: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 13,
    paddingRight: 13,
    marginTop: 9,
  },
  textItem: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 15,
    color: '#4B4A49',
    color: '#fff',
  },
});

export default ListViewTSCD;
