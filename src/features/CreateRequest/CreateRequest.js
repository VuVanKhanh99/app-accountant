import React, {useState, useRef, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {durableTimeMessage} from '../../app/contants/message';
import DatePickerInput from '../../components/DatePicker';
import moment from 'moment';
import {formatToList, formatToListOptionType} from '../../utils/function';
import {createReqStatus, typeCreateRe} from '../../contants/createRequest';
import {getListMaterials} from '../Material/materialActions';
import {createNewReqProduct} from './createReqProActions';

const listStatus = formatToList(createReqStatus);
const listTypeReq = formatToList(typeCreateRe);

function CreateRequest() {
  const dispatch = useDispatch();
  const listMaterial = useSelector(state => state.material.listMaterial);
  const ref = useRef();
  const toastMes = useRef();
  const [codeReq, setCodeReq] = useState('');
  const [product, setProduct] = useState('vattu');
  const [status, setStatus] = useState('');
  const [quanTity, setQuantity] = useState(0);
  const [checkErr, setCheckErr] = useState(false);
  const [typeReq, setTypeReq] = useState(listTypeReq[0]?.value);
  const [dataMaterial, setDataMaterial] = useState([]);
  const [dayStart, setDayStart] = useState(
    moment(new Date()).utc().format('DD-MM-YYYY'),
  );
  const [dayEnd, setDayEnd] = useState(
    moment(new Date(), 'DD-MM-YYYY').utc().add(19, 'days').format('DD-MM-YYYY'),
  );

  useEffect(() => {
    dispatch(getListMaterials());
  }, []);

  useEffect(() => {
    listMaterial?.length > 0 &&
      setDataMaterial(formatToListOptionType(listMaterial));
  }, [listMaterial]);

  const convertToDate = d => {
    const [day, month, year] = d.split('-');
    return new Date(year, month - 1, day);
  };

  const handleSetStartDay = day => {
    if (convertToDate(day) < convertToDate(dayEnd)) {
      setDayStart(day);
    } else {
      setCheckErr(true);
      return toastMes.current.show(
        'Ng??y y??u c???u ph???i tr?????c ng??y ho??n th??nh !',
        durableTimeMessage,
      );
    }
  };

  const checkEqualDay = (day1, day2) => {
    const arr1 = day1.split('-');
    const arr2 = day2.split('-');
    return arr1[0] == arr2[0] && arr1[1] == arr2[1] && arr1[2] == arr2[2];
  };

  const handleSetEndDay = day => {
    if (!checkEqualDay(day, moment(new Date()).utc().format('DD-MM-YYYY'))) {
      if (convertToDate(day) > convertToDate(dayStart)) {
        setDayEnd(day);
      } else {
        setCheckErr(true);
        return toastMes.current.show(
          'Ng??y ho??n th??nh ph???i sau ng??y y??u c???u !',
          durableTimeMessage,
        );
      }
    }
  };

  const handleSetQuantity = item => {
    if (item % 1 === 0) {
      setQuantity(item);
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!codeReq) {
      setCheckErr(true);
      return toastMes.current.show(
        'B???n ph???i ??i???n m?? y??u c???u s???n xu???t!',
        durableTimeMessage,
      );
    }

    if (!status) {
      setCheckErr(true);
      return toastMes.current.show(
        'B???n ph???i ch???n tr???ng th??i !',
        durableTimeMessage,
      );
    }

    if (quanTity === 0) {
      setCheckErr(true);
      return toastMes.current.show(
        'B???n ph???i ??i???n s??? l?????ng s???n ph???m y??u c???u !',
        durableTimeMessage,
      );
    }

    dispatch(
      createNewReqProduct({
        codeReq,
        product,
        statusReq: status,
        quanTity,
        dayStart,
        dayEnd,
        typeReq,
        callback: (status, res) => {
          try {
            console.log(res);
            setCheckErr(!(status === 201));
            // if (status === 201) {
            //   setName('');
            //   setCode('');
            //   setUnit('');
            // }
            return toastMes.current.show(res, durableTimeMessage);
          } catch (error) {
            console.log(err);
          }
        },
      }),
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      ref={ref}>
      <KeyboardAvoidingView behavior="padding" style={styles.wrapSectionInput}>
        <View style={styles.container}>
          <Toast
            ref={toastMes}
            style={{
              backgroundColor: checkErr ? '#F22A1D' : '#33D1B8',
              padding: 10,
            }}
            position={'center'}
            fadeInDuration={200}
            fadeOutDuration={100}
            textStyle={{color: '#fff', fontSize: 15}}
          />
          <View style={styles.containerItem}>
            <Text style={styles.titleItem}>
              M?? y??u c???u <Text style={styles.markRequire}>*</Text>
            </Text>
            <TextInput
              value={codeReq}
              autoCorrect={false}
              style={styles.textView}
              onChangeText={val => setCodeReq(val)}
            />
          </View>
          <View style={styles.containerItem}>
            <Text style={styles.titleItem}>S???n ph???m</Text>
            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                borderRadius: 5,
              }}>
              {dataMaterial?.length > 0 ? (
                <RNPickerSelect
                  onValueChange={value => setProduct(value)}
                  pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                  items={dataMaterial}
                  placeholder={{label: 'Ch???n lo???i v???t t??', value: ''}}
                  value={product}
                  style={styles.selectView}
                  textInputProps={{style: {backgroundColor: 'blue'}}}
                  touchableWrapperProps={{style: {backgroundColor: 'blue'}}}
                />
              ) : (
                <ActivityIndicator size="large" color="#00ff00" />
              )}
            </View>
          </View>
          <View style={styles.containerItem}>
            <Text style={styles.titleItem}>
              Tr???ng th??i
              <Text style={styles.markRequire}> *</Text>
            </Text>
            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                borderRadius: 5,
              }}>
              <RNPickerSelect
                onValueChange={value => setStatus(value)}
                pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                items={listStatus}
                placeholder={{label: 'Ch???n tr???ng th??i', value: ''}}
                value={status}
                style={styles.selectView}
                textInputProps={{style: {backgroundColor: 'blue'}}}
                touchableWrapperProps={{style: {backgroundColor: 'blue'}}}
              />
            </View>
          </View>
          <View style={styles.containerItem}>
            <Text style={styles.titleItem}>
              S??? l?????ng <Text style={styles.markRequire}>*</Text>
            </Text>
            <TextInput
              value={quanTity}
              autoCorrect={false}
              style={styles.textView}
              onChangeText={handleSetQuantity}
            />
          </View>
          <View style={styles.containerItem}>
            <Text style={styles.titleItem}>
              Ng??y y??u c???u <Text style={styles.markRequire}>*</Text>
            </Text>
            <DatePickerInput
              handleDay={handleSetStartDay}
              dayData={null}
              style={styles.dateView}
            />
          </View>
          <View style={styles.containerItem}>
            <Text style={styles.titleItem}>Ng??y ho??n th??nh</Text>
            <DatePickerInput
              handleDay={handleSetEndDay}
              dayData={moment(new Date(), 'DD-MM-YYYY')
                .utc()
                .add(19, 'days')
                .format('DD-MM-YYYY')}
              style={styles.dateView}
            />
          </View>
          <View style={[styles.containerItem, styles.viewEnd]}>
            <Text style={styles.titleItem}>Lo???i</Text>
            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                borderRadius: 5,
              }}>
              <RNPickerSelect
                onValueChange={value => setTypeReq(value)}
                pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                items={listTypeReq}
                placeholder={{label: 'Ch???n lo???i y??u c???u', value: ''}}
                value={typeReq}
                style={styles.selectView}
                textInputProps={{style: {backgroundColor: 'blue'}}}
                touchableWrapperProps={{style: {backgroundColor: 'blue'}}}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.btnSubmit}
            activeOpacity={0.9}
            onPress={handleSubmit}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'Montserrat-ExtraBold',
              }}>
              Th??m y??u c???u
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default CreateRequest;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    backgroundColor: '#1AA7A7',
    paddingBottom: 30,
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
    marginTop: 40,
    padding: 10,
    // backgroundColor:'red'
  },
  viewEnd: {
    marginTop: 2,
    paddingTop: 5,
  },
  dateView: {
    marginTop: -40,
    padding: 30,
    borderRadius: 5,
  },
  containerItem: {
    flex: 2,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  titleItem: {
    fontSize: 17,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
  },
  textView: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
    fontSize: 14,
  },
  selectView: {
    backgroundColor: 'green',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -100,
    marginBottom: 50,
    borderWidth: 2,
    borderColor: 'blue',
  },
  btnSubmit: {
    width: '100%',
    height: 60,
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: '#EE1A05',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markRequire: {
    color: '#8F0404',
  },
});
