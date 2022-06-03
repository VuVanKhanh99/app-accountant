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
import {durableTimeMessage} from '../../../app/contants/message';
import SubItem from './SubItem';
import {getListProcess, getListUnit} from '../../Category/categoryAction';
import {formatToListOption} from '../../../utils/function';
import {addMaterial} from '../materialActions';

const itemType = [
  {label: 'Bán thành phẩm', value: 'banthanhpham'},
  {label: 'Vật tư', value: 'vattu'},
  {label: 'Sản phẩm', value: 'sanpham'},
];

function Item() {
  const dispatch = useDispatch();
  const listProcess = useSelector(state => state.category.listProcess);
  const listUnit = useSelector(state => state.category.listUnit);
  const loadingCheck = useSelector(state => state.category.loading);

  const ref = useRef();
  const toastMes = useRef();
  const [name, setName] = useState('');
  const [type, setType] = useState('vattu');
  const [code, setCode] = useState('');
  const [unit, setUnit] = useState('');
  const [redundantThe, setRedundantThe] = useState('');
  const [checkErr, setCheckErr] = useState(false);
  const [checksb, setCheckSB] = useState(false);
  const [listPro, setListPro] = useState([]);
  const [listU, setListU] = useState([]);

  useEffect(() => {
    dispatch(getListProcess());
    dispatch(getListUnit());
  }, []);

  useEffect(() => {
    const dataProcess =
      listProcess?.length > 0 && formatToListOption(listProcess);
    const dataUnit = listUnit?.length && formatToListOption(listUnit);

    if (dataProcess.length > 0) {
      setListPro(dataProcess);
      setListU(dataUnit);
    }
  }, [listProcess, listUnit]);

  const valueItem = (arr, val) => {
    return arr.filter(item => item.value === val)[0]?.label;
  };

  const handleSubmit = async (redundantRe, process, durable, person) => {
    setCheckSB(!checksb);

    if (!name) {
      setCheckSB(!checksb);
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền tên vật tư!',
        durableTimeMessage,
      );
    }

    if (!code) {
      setCheckSB(!checksb);
      setCheckErr(true);

      return toastMes.current.show(
        'Bạn phải điền mã vật tư!',
        durableTimeMessage,
      );
    }

    if (!unit) {
      setCheckErr(true);
      setCheckSB(!checksb);
      return toastMes.current.show('Bạn phải chọn đơn vị!', durableTimeMessage);
    }

    if (
      valueItem(itemType, type) !== undefined &&
      valueItem(listU, unit) !== undefined
    ) {
      dispatch(
        addMaterial({
          name,
          type: valueItem(itemType, type) ?? '',
          code,
          unit: valueItem(listU, unit) ?? '',
          redundantThe,
          redundantRe: redundantRe ? redundantRe : '',
          process: process ?? '',
          durable: durable ? durable : 0,
          person: person ? person : 0,
          callback: (status, res) => {
            try {
              setCheckErr(!(status === 201));
              if (status === 201) {
                setName('');
                setCode('');
                setUnit('');
              }
              return toastMes.current.show(res, durableTimeMessage);
            } catch (error) {
              console.log(err);
            }
          },
        }),
      );
    }

    setCheckSB(!checksb);
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
              Tên vật tư <Text style={styles.markRequire}>*</Text>
            </Text>
            <TextInput
              value={name}
              autoCorrect={false}
              style={styles.textView}
              onChangeText={val => setName(val)}
            />
          </View>
          <View style={styles.containerItem}>
            <Text style={styles.titleItem}>Loại</Text>
            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                borderRadius: 5,
              }}>
              <RNPickerSelect
                onValueChange={value => setType(value)}
                pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                items={itemType}
                placeholder={{label: 'Chọn loại vật tư', value: ''}}
                value={type}
                style={styles.selectView}
                textInputProps={{style: {backgroundColor: 'blue'}}}
                touchableWrapperProps={{style: {backgroundColor: 'blue'}}}
              />
            </View>
          </View>
          <View style={styles.containerItem}>
            <Text style={styles.titleItem}>
              Mã vật tư <Text style={styles.markRequire}>*</Text>
            </Text>
            <TextInput
              value={code}
              autoCorrect={false}
              style={styles.textView}
              onChangeText={val => val % 1 === 0 && setCode(val)}
            />
          </View>
          {!loadingCheck && listU.length > 0 ? (
            <View style={styles.containerItem}>
              <Text style={styles.titleItem}>
                Đơn vị chính <Text style={styles.markRequire}>*</Text>
              </Text>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  borderRadius: 5,
                }}>
                <RNPickerSelect
                  onValueChange={value => setUnit(value)}
                  pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                  items={listU}
                  value={unit}
                  style={styles.selectView}
                  placeholder={{label: 'Chọn đơn vị chính', value: ''}}
                  textInputProps={{style: {backgroundColor: 'blue'}}}
                  touchableWrapperProps={{style: {backgroundColor: 'blue'}}}
                />
              </View>
            </View>
          ) : (
            <ActivityIndicator size="large" color="#00ff00" />
          )}

          <View style={styles.containerItem}>
            <Text style={styles.titleItem}>Tồn lí thuyết</Text>
            <TextInput
              value={redundantThe}
              autoCorrect={false}
              style={styles.textView}
              onChangeText={val => setRedundantThe(val)}
            />
          </View>
          <SubItem
            checksb={checksb}
            handleSubmit={handleSubmit}
            loading={loadingCheck}
            listProcess={listPro}
          />
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
              Thêm mới
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Item;

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
