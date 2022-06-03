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
  createDataEmProd,
  createDataProcessProd,
  deleteMaterialProd,
  getDataEmployeelProd,
  getDataMaterialProd,
  getListReqCurrent,
  getListReqProduct,
  updateEmProd,
} from '../../CreateRequest/createReqProActions';
import ListViewIncompleteProd from '../../../components/ListViewIncompleteProd';
import {
  createIncompleteProd,
  deleteIncompleteProd,
  getListIncompleteProd,
} from '../systemAction';
import {typeCreateRe} from '../../../contants/createRequest';
import {convertFormatDate} from '../../../utils/function';

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

function IncompleteProd() {
  const dispatch = useDispatch();
  const ref = useRef();
  const toastMes = useRef();
  const listReqProduct = useSelector(state => state.reqProduct.listReqProduct);
  const dataReqCurrent = useSelector(state => state.reqProduct.listReqCurrent);
  const listIncompleteProd = useSelector(
    state => state.system.dataIncompleteProd,
  );
  const [checkErr, setCheckErr] = useState(false);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [dataItem, setDataItem] = useState([]);

  useEffect(() => {
    dispatch(getListReqProduct());
    dispatch(getListReqCurrent());
    dispatch(getDataEmployeelProd());
    dispatch(getDataMaterialProd());
    dispatch(getListIncompleteProd());
  }, []);


  useEffect(() => {
    if (dataReqCurrent?.length > 0) {
      const dataCheck = dataReqCurrent.filter(
        item => item.typeReq === typeCreateRe[1],
      );
      const listItem =
        dataReqCurrent?.length > 0 && convertToListItem(dataCheck);
      listItem?.length > 0 && setDataItem(listItem);
    }
  }, [dataReqCurrent]);

  const handleSubmit = async () => {
    if (!product) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải chọn đơn hàng !',
        durableTimeMessage,
      );
    }
    if (!quantity) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền số lượng sản phẩm dở dang !',
        durableTimeMessage,
      );
    }

    const item = dataReqCurrent.filter(item => item.codeReq === product)[0];
    const difference =
      new Date(convertFormatDate(item.endDate)).getTime() -
      new Date(convertFormatDate(item.startDate)).getTime();
    const countDay = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

    await dispatch(
      createIncompleteProd({
        codeReq: product,
        quantity,
        callback: async (status, res) => {
          await setCheckErr(!(status === 201));
          return (
            status !== 201 && toastMes.current.show(res, durableTimeMessage)
          );
        },
      }),
    );

    await dispatch(
      createDataProcessProd({
        product: item.nameProduct,
        codeReq: product,
        amount: item.quantity,
        incompleteProd: quantity,
        callback: status => {
          try {
            status === 201 &&
              dispatch(
                updateEmProd({
                  codeReq: product,
                  incompleteProd: quantity,
                  callback: async (status, mess) => {
                    if (status !== 201) {
                      setCheckErr(true);
                      toastMes.current.show(mess, durableTimeMessage + 1000);
                    }
                  },
                }),
              );
          } catch (error) {
            console.log(err);
          }
        },
      }),
    );
  };

  async function handleDelete(codeReq) {
    if (codeReq) {
      await dispatch(deleteIncompleteProd({codeReq}));

      const item = listReqProduct.filter(item => item.codeReq === codeReq)[0];
      const difference =
        new Date(convertFormatDate(item.endDate)).getTime() -
        new Date(convertFormatDate(item.startDate)).getTime();
      const countDay = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

      await dispatch(deleteMaterialProd({codeReq}));

      await dispatch(
        createDataProcessProd({
          product: item.nameProduct,
          codeReq,
          amount: item.quantity,
          callback: status => {
            try {
              status === 201 &&
                dispatch(
                  createDataEmProd({
                    product: item.nameProduct,
                    date: countDay,
                    codeReq,
                    amount: item.quantity,
                    callback: (status, mess) => {
                      if (status !== 201) {
                        setCheckErr(true);
                        toastMes.current.show(mess, durableTimeMessage + 1000);
                        //handleRemove(codeReq);
                      } else dispatch(getListReqCurrent());
                    },
                  }),
                );
            } catch (error) {
              console.log(err);
            }
          },
        }),
      );
    }
  }

  const handleSetQuantity = item => {
    if (item % 1 === 0) {
      setQuantity(item);
    } else {
      return false;
    }
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
            position={'top'}
            fadeInDuration={200}
            fadeOutDuration={100}
            textStyle={{color: '#fff', fontSize: 15}}
          />
          <Text style={styles.titleItem}>Kế toán sản phẩm dở dang</Text>
          {dataItem.length > 0 ? (
            <>
              <View style={styles.containerItem}>
                <View style={styles.sectionItem}>
                  <Text style={styles.titleText}>Chọn đơn sản xuất</Text>
                  <View style={styles.viewOption}>
                    <RNPickerSelect
                      onValueChange={value => setProduct(value)}
                      pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                      items={dataItem}
                      placeholder={{label: 'Chọn đơn sản xuất', value: ''}}
                      value={product}
                      textInputProps={{style: {backgroundColor: 'blue'}}}
                      style={styles.selectView}
                    />
                  </View>
                </View>
                <View style={styles.sectionItem}>
                  <Text style={styles.titleText}>
                    Nhập số lượng sản phẩm dở dang
                  </Text>
                  <View style={styles.viewOption}>
                    <TextInput
                      value={quantity}
                      autoCorrect={false}
                      style={styles.textView}
                      onChangeText={handleSetQuantity}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.sectionSubmit}
                onPress={handleSubmit}>
                <FontAwesome5
                  name={'plus'}
                  size={19}
                  color="#fff"
                  //style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </>
          ) : (
            <ErrorPage />
          )}
          <>
            {listIncompleteProd?.length > 0 && (
              <ListViewIncompleteProd
                arrSource={listIncompleteProd}
                arrView={dataReqCurrent}
                handleDelete={handleDelete}
              />
            )}
          </>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
export const ErrorPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles?.errPage}>
        <Text style={styles.textErrMain}>Oops !</Text>
        <Text style={styles.desErr}>Chưa có đơn hàng nào đang tiến hành !</Text>
      </View>
    </View>
  );
};

export default IncompleteProd;

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
    justifyContent: 'center',
    width: '100%',
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
    width: '30%',
    height: '100%',
  },
  containerItem: {
    flex: 2,
    width: '100%',
    flexDirection: 'column',
    height: 70,
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
    marginBottom: 1,
  },
  warningPayslip: {
    marginTop: 20,
    color: '#8F0404',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
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
    marginTop: 115,
    borderWidth: 1.5,
    //backgroundColor:'#265D62',
    borderColor: '#fff',
    borderRadius: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  errPage: {
    height: 270,
    width: '100%',
    marginTop: 60,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textErrMain: {
    fontSize: 25,
    fontFamily: 'OpenSans_SemiCondensed-Italic',
  },
  desErr: {
    fontFamily: 'OpenSans_SemiCondensed-SemiBold',
    fontSize: 17,
    marginTop: 5,
  },
});
