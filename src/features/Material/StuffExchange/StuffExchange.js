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
  createPriceStuff,
  deletePriceItem,
  deletePriceStuff,
  getListMaterials,
  getListPriceItem,
  getListPriceStuff,
} from '../materialActions';
import ListViewPriceStuff from '../../../components/ListViewPriceStuff';

function StuffExchange() {
  const dispatch = useDispatch();
  const listPriceStuff = useSelector(state => state.material.listPriceStuff);
  const checkLoading = useSelector(state => state.material.loading);
  const ref = useRef();
  const toastMes = useRef();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [listItem, setListItem] = useState([]);
  const [checkErr, setCheckErr] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    dispatch(getListPriceStuff());
  }, []);

  const handleSubmit = async () => {
    if (!name) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền tên vật liệu !',
        durableTimeMessage,
      );
    }

    if (!price) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền giá vật liệu !',
        durableTimeMessage,
      );
    }

    if (!quantity) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền số lượng vật liệu đã dùng !',
        durableTimeMessage,
      );
    }

    if (!unit) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền đơn vị của vật liệu !',
        durableTimeMessage,
      );
    }

    setCheckErr(false);

    dispatch(
      createPriceStuff({
        name,
        price,
        quantity,
        unit,
        callback: async (status, res) => {
          await setCheckErr(!(status === 201));
          if (status === 201) {
            setName(null);
            setQuantity(0);
            setUnit('');
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

  const handleSetQuantity = item => {
    if (item % 1 === 0) {
      setQuantity(item);
    } else {
      return false;
    }
  };

  async function handleDelete(item) {
    item && (await dispatch(deletePriceStuff({nameStuff: item})));
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
          <Text style={styles.titleItem}>Thống kê vật liệu phụ</Text>
          <View style={styles.containerItem}>
            <View style={styles.sectionItem}>
              <Text style={styles.titleText}>
                Vật liệu <Text style={styles.markRequire}>*</Text>
              </Text>
              <TextInput
                value={name}
                autoCorrect={false}
                style={styles.textView}
                onChangeText={val => setName(val)}
              />
            </View>
            <View style={styles.sectionItem2}>
              <Text style={styles.titleText}>
                Giá <Text style={styles.markRequire}>*</Text>
              </Text>
              <View
                style={{position: 'relative', width: '100%', height: '100%'}}>
                <TextInput
                  value={price}
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
          </View>
          <View style={styles.containerItem}>
            <View style={styles.sectionItem}>
              <Text style={styles.titleText}>
                Số lượng <Text style={styles.markRequire}>*</Text>
              </Text>
              <TextInput
                value={quantity}
                autoCorrect={false}
                style={styles.textView}
                onChangeText={handleSetQuantity}
              />
            </View>
            <View style={styles.sectionItem2}>
              <Text style={styles.titleText}>
                Đơn vị <Text style={styles.markRequire}>*</Text>
              </Text>
              <TextInput
                value={unit ?? ''}
                autoCorrect={false}
                style={styles.textView}
                onChangeText={val => setUnit(val)}
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
            {listPriceStuff?.length > 0 && (
              <>
                {checkLoading ? (
                  <ActivityIndicator size="large" color="#00ff00" />
                ) : (
                  <ListViewPriceStuff
                    arrSource={listPriceStuff}
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

export default StuffExchange;

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
    width: '46%',
    height: '100%',
  },
  sectionItem2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '46%',
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
    marginTop: 27,
  },
  selectView: {
    backgroundColor: 'green',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleItem: {
    fontSize: 23,
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
    width: '106%',
    marginLeft: '-3%',
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
