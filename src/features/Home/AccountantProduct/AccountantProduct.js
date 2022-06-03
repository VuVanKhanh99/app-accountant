import React, {useState, useRef, createRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {LogoIcon} from '../../assets/images';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
//import {durableTimeMessage} from '../../contants/message';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDataEmployeelProd,
  getDataMaterialProd,
  getListReqCurrent,
  calculAccountProd,
} from '../../CreateRequest/createReqProActions';
import RNPickerSelect from 'react-native-picker-select';
import {createAccountTSCD} from '../../System/systemAction';
import {
  convertCurrencyToNumber,
  convertFormatDate,
  formartToCurrency,
} from '../../../utils/function';
import {durableTimeMessage} from '../../../app/contants/message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const convertToListItem = arr => {
  let data = [];
  arr.map(item => {
    let label = `${item.nameProduct} (${item.codeReq}) SL:${item.quantity}`;
    let value = item.codeReq;
    let object = {label, value};
    data = [...data, object];
  });
  return data;
};

function AccountantProduct() {
  const ref = useRef();
  const dispatch = useDispatch();
  const toastMes = createRef();
  const input = useRef();

  const dataEmployee = useSelector(state => state.reqProduct.dataListEmployee);
  const dataMaterial = useSelector(state => state.reqProduct.dataListMaterial);
  const dataReqCurrent = useSelector(state => state.reqProduct.listReqCurrent);
  const listItem =
    dataReqCurrent?.length > 0 && convertToListItem(dataReqCurrent);

  const calculProd = useSelector(state => state.reqProduct.calculAccountProd);
  const [product, setProduct] = useState('');
  const [dataCal, setDataCal] = useState({});
  const [priceRe, setPriceRe] = useState(0);
  const [checkErr, setCheckErr] = useState(false);
  const [calProd, setCalProd] = useState({});
  const checkDataEmpty = Object.keys(dataCal)?.length;

  useEffect(() => {
    if (calculProd) {
      Object.keys(calculProd)?.length > 0 && setDataCal(calculProd);
    }
  }, [calculProd]);

  useEffect(() => {
    dispatch(getListReqCurrent());
    dispatch(getDataEmployeelProd());
    dispatch(getDataMaterialProd());
    dispatch(createAccountTSCD());
    dispatch(calculAccountProd({}));
    setDataCal({});
  }, []);

  async function handleSetProduct(codeReq) {
    if (codeReq) {
      await setProduct(codeReq);
      await dispatch(calculAccountProd({codeReq}));
      setPriceRe(0);
      setCalProd({});
    } else {
      setDataCal({});
    }
  }

  const handleSetPrice = item => {
    const checkPrice = item.toString().split(',').join('');
    if (+checkPrice % 1 === 0) {
      setPriceRe(formartToCurrency(checkPrice));
    } else {
      return false;
    }
  };

  const handleGetDurable = codeReq => {
    const item = dataReqCurrent.filter(item => item.codeReq === codeReq)[0];
    const difference =
      new Date(convertFormatDate(item.endDate)).getTime() -
      new Date(convertFormatDate(item.startDate)).getTime();
    const countDay = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    return countDay;
  };

  const handleSubmit = () => {
    const price = Math.ceil(dataCal?.costAccumlator);
    const priceText = convertCurrencyToNumber(priceRe);
    // console.log(price, priceRe);
    if (+priceText > +price) {
      const greenPerProd = (+priceText - +price);
      const greenTotal = formartToCurrency(greenPerProd * +dataCal?.amountProd);
      const durableDay = handleGetDurable(product);
      const priceAfterTax = formartToCurrency(
        Math.ceil((+priceText * 100) / (100 - +dataCal?.taxGTGT)),
      );
      const tk5512 = priceRe;
      const obj = {greenPerProd:formartToCurrency(greenPerProd), greenTotal, durableDay, priceAfterTax, tk5512};

      setCalProd(obj);
    } else {
      setCheckErr(true);
      return toastMes.current.show(
        'Giá thành phẩm phải lớn hơn Nợ TK-155 ',
        durableTimeMessage,
      );
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      ref={ref}>
      <KeyboardAvoidingView behavior="padding" style={styles.wrapSectionInput}>
        <View style={styles.container}>
          <Text style={styles.titleItem}>Quản lý chi phí sản xuất</Text>
          <View style={styles.containerItem}>
            {listItem?.length > 0 ? (
              <>
                <Text style={styles.titleItemY}>Chọn đơn hàng</Text>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    borderRadius: 5,
                  }}>
                  <RNPickerSelect
                    onValueChange={handleSetProduct}
                    pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                    items={listItem}
                    placeholder={{label: '', value: ''}}
                    value={product}
                    style={styles.selectView}
                    textInputProps={{style: {backgroundColor: 'blue'}}}
                    touchableWrapperProps={{style: {backgroundColor: 'blue'}}}
                  />
                </View>
              </>
            ) : (
              <View style={styles.viewLoading}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            )}
            {checkDataEmpty > 0 && (
              <>
                <View style={styles.viewAccount}>
                  <Text style={styles.textTT133}>Hạch toán Thông tư 133</Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: 30,
                      width: '98%',
                      left: '1%',
                    }}>
                    <Text style={styles.totalCost}>
                      Nợ TK 154 :{' '}
                      {`${formartToCurrency(Math.ceil(dataCal?.result133))}đ`}
                    </Text>
                    {+dataCal?.costRedantdunt !== 0 && (
                      <>
                        <Text style={styles.totalCost}>
                          Tổng chi phí dở dang :{' '}
                          {`${formartToCurrency(
                            Math.ceil(dataCal?.costRedantdunt),
                          )}đ`}
                        </Text>
                      </>
                    )}
                    <View>
                      <Text style={styles.totalCost}>
                        Hạch toán giá thành thành phẩm nhập kho
                      </Text>
                      <Text style={styles.totalCostMain}>
                        {'==>'} Nợ TK – 155:{' '}
                        {`${formartToCurrency(
                          Math.ceil(dataCal?.costAccumlator),
                        )}đ`}{' '}
                        {`<${dataCal?.amountProd} sản phẩm>`}
                      </Text>
                      <Text style={styles.totalCostMain}>
                        {'==>'} Có TK – 154:{' '}
                        {`${formartToCurrency(
                          Math.ceil(dataCal?.costAccumlator),
                        )}đ`}
                      </Text>
                      <Text style={styles.textTax}>
                        (Thuế GTGT phải nộp là : {dataCal?.taxGTGT}%)
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{width: '100%', height: 100, marginBottom: 70}}>
                  <View style={styles.sectionItem2}>
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
                    <Text style={styles.titleText}>
                      Nhập giá thành phẩm mong muốn sau thuế{' '}
                    </Text>
                    <View
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                      }}>
                      <TextInput
                        value={priceRe ?? 0}
                        autoCorrect={false}
                        style={styles.textView}
                        ref={input}
                        // onEndEditing={e => handleGetPrice(e.nativeEvent.text)}
                        //onEndEditing={handleSetPrice}
                        onChangeText={handleSetPrice}
                      />
                      <Text
                        style={{
                          position: 'absolute',
                          fontSize: 17,
                          fontFamily: 'OpenSans-Medium',
                          marginLeft: '94%',
                          marginTop: '3%',
                        }}>
                        {'đ'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{width: '100%'}}>
                  <TouchableOpacity
                    style={styles.sectionSubmit}
                    onPress={handleSubmit}>
                    <FontAwesome5
                      name={'dolly'}
                      size={23}
                      color="#fff"
                      //style={styles.deleteIcon}
                    />
                    <Text style={styles.textBtn}>Tính giá thành phẩm</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            {Object.keys(calProd).length > 0 && (
              <View style={styles.viewAccount2}>
                <Text style={styles.textTT133}>Phản ánh doanh thu</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 30,
                    width: '98%',
                    left: '1%',
                  }}>
                  <Text style={styles.totalCostMain}>
                    {'==>'} Giá thành phẩm (Nợ TK 112):{' '}
                    {`${calProd?.priceAfterTax}đ`}
                  </Text>
                  <Text style={styles.totalCost}>
                    Có TK-5112: {`${calProd?.tk5512}đ`}
                  </Text>
                  <Text style={styles.totalCostMain}>
                    {'==>'} Lãi trên mỗi sản phẩm: {`${calProd?.greenPerProd}đ`}
                    {/* {`${formartToCurrency(Math.ceil(dataCal?.costAccumlator))}đ`}{' '}
                {`<${dataCal?.amountProd} sản phẩm>`} */}
                  </Text>
                  <Text style={styles.totalCost}>
                    Tổng lãi:{' '}
                    {`${calProd?.greenTotal}đ trong ${calProd?.durableDay} ngày`}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default AccountantProduct;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    left: '2.5%',
    display: 'flex',
    flexDirection: 'column',
    //height:900
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#1AA7A7',
    paddingBottom: 30,
  },
  viewBtn: {
    width: '100%',
    marginTop: -100,
  },
  textView: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
    fontSize: 14.8,
    fontFamily: 'OpenSans-Medium',
  },
  textBtn: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 8,
  },
  titleText: {
    fontSize: 16,
    color: '#fff',
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    marginLeft: 5,
    marginBottom: 8,
  },
  sectionItem2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  sectionSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    //height: 40,
    borderWidth: 1.5,
    flexDirection: 'row',
    //backgroundColor:'#265D62',
    borderColor: '#fff',
    borderRadius: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 7,
  },
  viewAccount: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#555858',
    borderRadius: 4,
    marginTop: 50,
    alignItems: 'center',
    padding: 18,
  },
  viewAccount2: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#555858',
    borderRadius: 4,
    marginTop: 30,
    alignItems: 'center',
    padding: 18,
    marginBottom: 40,
  },
  totalCost: {
    color: '#2FCA9E',
    fontSize: 16.1,
    fontFamily: 'OpenSans-Medium',
    marginTop: 10,
  },
  textTax: {
    color: '#2FCA9E',
    fontSize: 15.8,
    fontFamily: 'OpenSans-Medium',
    marginTop: 10,
  },
  totalCostMain: {
    color: '#2FCA9E',
    fontSize: 15.5,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 10,
  },
  textTT133: {
    color: '#2FCA9E',
    fontSize: 17,
    fontFamily: 'Montserrat-SemiBold',
  },
  titleItem: {
    fontSize: 22,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    color: '#fff',
    padding: 7,
    marginTop: 30,
    marginBottom: 20,
  },
  titleItemY: {
    fontSize: 17,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    color: '#fff',
    marginBottom: 3,
    padding: 8,
  },
  containerItem: {
    flex: 2,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
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
  viewLoading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
