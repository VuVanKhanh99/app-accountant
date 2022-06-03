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
import {
  formatToListOption,
  convertLabel,
  formatToListOptionType,
} from '../../utils/function';
import {durableTimeMessage} from '../../app/contants/message';
import {getListMaterials} from '../Material/materialActions';
import {createRecipe, deleteRecipe, getListRecipe} from './systemAction';
import ListViewRecipe from '../../components/ListViewRecipe';
import { getListUnit } from '../Category/categoryAction';

function ExchangeMaterial() {
  const dispatch = useDispatch();
  const ref = useRef();
  const toastMes = useRef();
  const listMaterial = useSelector(state => state.material.listMaterial);
  const checkLoading = useSelector(state => state.system.loading);
  const dataUnit = useSelector(state => state.category.listUnit);
  const dataRecipe = useSelector(state => state.system.listRecipe);
  const listUnit = formatToListOptionType(dataUnit);
  const [dataMaterial, setDataMaterial] = useState([]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');
  const [checkErr, setCheckErr] = useState(false);


  useEffect(() => {
    dispatch(getListMaterials());
    dispatch(getListRecipe());
    dispatch(getListUnit());
  }, []);

  useEffect(() => {
    listMaterial?.length > 0 &&
      setDataMaterial(formatToListOptionType(listMaterial));
  }, [listMaterial]);

  useEffect(() => {
    if (input) {
      const nameUnit = listMaterial.filter(item => item.name === input)[0]
        ?.unit;
      nameUnit && setUnit(nameUnit);
    }
  }, [input]);

  const handleSubmit = () => {
    if (!output) {
      setCheckErr(true);
      return toastMes.current.show('Bạn phải chọn đầu ra!', durableTimeMessage);
    }

    if (!input) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải chọn đầu vào!',
        durableTimeMessage,
      );
    }

    if (!quantity) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền số lượng!',
        durableTimeMessage,
      );
    }

    const quan = quantity ? quantity : 0;
    
    dispatch(
      createRecipe({
        output,
        input,
        quan,
        unit,
        callback: (status, res) => {
          try {
            setCheckErr(!(status === 201));
            status === 201 && setQuantity(0);
            return toastMes.current.show(res, durableTimeMessage);
          } catch (error) {
            console.log(err);
          }
        },
      }),
    );
  };

  async function handleDelete(id) {
    id && (await dispatch(deleteRecipe({id})));
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      ref={ref}>
      <KeyboardAvoidingView behavior="padding" style={styles.wrapSectionInput}>
        <View style={styles.containerView}>
          {dataRecipe?.length > 0 && (
            <>
              {checkLoading ? (
                <ActivityIndicator size="large" color="#00ff00" />
              ) : (
                <ListViewRecipe
                  arrSource={dataRecipe}
                  handleDelete={handleDelete}
                />
              )}
            </>
          )}
        </View>
        {dataMaterial?.length > 0 ? (
          <View style={styles.container}>
            <Toast
              ref={toastMes}
              style={{
                backgroundColor: checkErr ? '#F22A1D' : '#33D1B8',
                padding: 10,
              }}
              position={'top'}
              fadeInDuration={200}
              fadeOutDuration={100}
              textStyle={{color: '#fff', fontSize: 15}}
            />
            <View style={styles.containerItem}>
              <Text style={styles.titleItem}>
                Đầu ra <Text style={styles.markRequire}>*</Text>
              </Text>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  borderRadius: 5,
                }}>
                <RNPickerSelect
                  onValueChange={value => setOutput(value)}
                  pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                  items={dataMaterial}
                  value={output}
                  placeholder={{label: 'Chọn đầu ra', value: ''}}
                  style={styles.selectView}
                  textInputProps={{style: {backgroundColor: 'blue'}}}
                  touchableWrapperProps={{style: {backgroundColor: 'blue'}}}
                />
              </View>
            </View>
            <View style={styles.containerItem}>
              <Text style={styles.titleItem}>
                Đầu vào <Text style={styles.markRequire}>*</Text>
              </Text>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  borderRadius: 5,
                }}>
                <RNPickerSelect
                  onValueChange={value => setInput(value)}
                  pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                  items={dataMaterial}
                  value={input}
                  placeholder={{label: 'Chọn đầu vào', value: ''}}
                  style={styles.selectView}
                  textInputProps={{style: {backgroundColor: 'blue'}}}
                  touchableWrapperProps={{style: {backgroundColor: 'blue'}}}
                />
              </View>
            </View>
            <View style={styles.containerItem}>
              <Text style={styles.titleItem}>
                Số lượng <Text style={styles.markRequire}>*</Text>
              </Text>
              <TextInput
                value={quantity}
                autoCorrect={false}
                style={styles.textView}
                onChangeText={val => val % 1 === 0 && setQuantity(val)}
              />
            </View>
            {listUnit?.length > 0 ? (
              <View style={styles.containerItem}>
                <Text style={styles.titleItem}>Đơn vị chính</Text>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    borderRadius: 5,
                  }}>
                  <TextInput
                    value={unit}
                    autoCorrect={false}
                    style={styles.textView}
                  />
                </View>
              </View>
            ) : (
              <ActivityIndicator size="large" color="#00ff00" />
            )}
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
        ) : (
          <ActivityIndicator size="large" color="#00ff00" />
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default ExchangeMaterial;

const styles = StyleSheet.create({
  containerView: {
    display: 'flex',
    width: '100%',
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#1AA7A7',
    paddingBottom: 60,
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
    marginTop: -20,
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
