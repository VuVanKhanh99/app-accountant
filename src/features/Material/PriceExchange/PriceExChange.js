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
import Toast from 'react-native-easy-toast';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import {durableTimeMessage} from '../../../app/contants/message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  formartToCurrency,
  formatToListOptionType,
} from '../../../utils/function';
import {
  createItemPrice,
  deletePriceItem,
  getListMaterials,
  getListPriceItem,
} from '../materialActions';
import ListViewPrice from '../../../components/ListViewPrice';

function PriceExchange() {
  const dispatch = useDispatch();
  const listMaterial = useSelector(state => state.material.listMaterial);
  const listPriceItem = useSelector(state => state.material.listPriceItem);
  const checkLoading = useSelector(state => state.material.loading);
  const ref = useRef();
  const toastMes = useRef();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [listItem, setListItem] = useState([]);
  const [checkErr, setCheckErr] = useState(false);
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    dispatch(getListMaterials());
    dispatch(getListPriceItem());
  }, []);

  useEffect(() => {
    if (listMaterial?.length > 0) {
      const data = listMaterial.filter(item => item?.type === 'Vật tư');

      const result = formatToListOptionType(data);
      result?.length > 0 && setListItem(result);
    }
  }, [listMaterial]);

  useEffect(() => {
    const getUnit = listMaterial.filter(item => item?.name === name)[0]?.unit;
    setUnit(getUnit);
  }, [name]);

  const handleSubmit = async () => {
    if (!name) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền tên nguyên liệu !',
        durableTimeMessage,
      );
    }

    if (!price) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền giá nguyên liệu !',
        durableTimeMessage,
      );
    }

    dispatch(
      createItemPrice({
        name,
        price,
        unit,
        callback: async (status, res) => {
          await setCheckErr(!(status === 201));
          if (status === 201) {
            setName(null);
            setPrice(null);
          }
          return (
            status !== 201 && toastMes.current.show(res, durableTimeMessage)
          );
        },
      }),
    );
  };

  const handleSetPrice = item => {
    const checkPrice = item.toString().split(',').join('');
    if (checkPrice % 1 === 0) {
      setPrice(formartToCurrency(checkPrice));
    } else {
      return false;
    }
  };

  async function handleDelete(item) {
    item && (await dispatch(deletePriceItem({nameItem: item})));
  }

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
            position={'top'}
            fadeInDuration={200}
            fadeOutDuration={100}
            textStyle={{color: '#fff', fontSize: 15}}
          />
          <Text style={styles.titleItem}>Quản lý giá nguyên liệu</Text>
          <View style={styles.containerItem}>
            <View style={styles.sectionItem}>
              <Text style={styles.titleText}>Nguyên liệu</Text>
              {listItem?.length > 0 ? (
                <View style={styles.viewOption}>
                  <RNPickerSelect
                    onValueChange={value => setName(value)}
                    pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                    items={listItem}
                    placeholder={{label: '', value: ''}}
                    value={name}
                    style={styles.selectView}
                    textInputProps={{style: {backgroundColor: 'blue'}}}
                    touchableWrapperProps={{style: {backgroundColor: 'blue'}}}
                  />
                </View>
              ) : (
                <ActivityIndicator size="large" color="#00ff00" />
              )}
            </View>
            <View style={styles.sectionItem2}>
              <Text style={styles.titleText}>Giá</Text>
              <View
                style={{position: 'relative', width: '100%', height: '100%'}}>
                <TextInput
                  value={price ?? 0}
                  autoCorrect={false}
                  style={styles.textView}
                  onChangeText={handleSetPrice}
                />
                <Text
                  style={{
                    position: 'absolute',
                    fontSize: 16,
                    fontFamily: 'OpenSans-Medium',
                    marginLeft: '88%',
                    marginTop: '4.5%',
                  }}>
                  {'đ'}
                </Text>
              </View>
            </View>
            <View style={styles.sectionItem3}>
              <Text style={styles.titleText}></Text>
              <TextInput
                value={unit ? `/${unit}` : ''}
                autoCorrect={false}
                style={styles.textView}
                //onChangeText={handleSetPrice}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.sectionSubmit} onPress={handleSubmit}>
            <FontAwesome5
              name={'plus'}
              size={19}
              color="#fff"
              //style={styles.deleteIcon}
            />
          </TouchableOpacity>
          <View style={styles.listView}>
            {listPriceItem?.length > 0 && (
              <>
                {checkLoading ? (
                  <ActivityIndicator size="large" color="#00ff00" />
                ) : (
                  <ListViewPrice
                    arrSource={listPriceItem}
                    handleDelete={handleDelete}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default PriceExchange;

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
    marginTop: 40,
    padding: 10,
  },
  sectionItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '42%',
    height: '100%',
  },
  sectionItem2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '26%',
    height: '100%',
  },
  sectionItem3: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '23%',
    height: '100%',
  },
  containerItem: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    marginTop: 17,
  },
  selectView: {
    backgroundColor: 'green',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleItem: {
    fontSize: 22,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    color: '#fff',
    marginBottom: 30,
  },
  titleText: {
    fontSize: 16,
    color: '#fff',
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    marginLeft: 5,
    marginBottom:1
  },
  textView: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
    paddingLeft: 10,
    height: '100%',
    fontSize: 15,
    fontFamily: 'OpenSans-Medium',
  },
  markRequire: {
    color: '#8F0404',
  },
  listView: {
    marginTop: 50,
  },
  viewOption: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: '100%',
    height: '100%',
    marginTop: '17%',
    left: '89.5%',
    zIndex: 10,
  },
  sectionSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 40,
    marginTop: 50,
    borderWidth: 1.5,
    //backgroundColor:'#265D62',
    borderColor: '#fff',
    borderRadius: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
