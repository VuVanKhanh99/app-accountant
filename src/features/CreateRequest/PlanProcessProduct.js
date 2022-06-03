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
import {durableTimeMessage} from '../../app/contants/message';
import {
  deleteReqProduct,
  createDataProcessProd,
  getListReqProduct,
  createDataEmProd,
  deleteMaterialProd,
  deleteEmployeeProd,
  getDataEmployeelProd,
  getDataMaterialProd,
  getListReqCurrent,
} from './createReqProActions';
import ListViewReqProduct from '../../components/ListViewReqProduct';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ListViewProcess from '../../components/ListViewProcess';
import {convertFormatDate, durableDay} from '../../utils/function';

function PlanProcessProduct() {
  const dispatch = useDispatch();
  const dataReqCurrent = useSelector(state => state.reqProduct.listReqCurrent);
  const [listPlan, setListPlan] = useState([]);

  const listReqProduct = useSelector(state => state.reqProduct.listReqProduct);
  const listDataProcess = useSelector(state => state.reqProduct.dataProcessPro);
  const dataEmployee = useSelector(state => state.reqProduct.dataListEmployee);
  const dataMaterial = useSelector(state => state.reqProduct.dataListMaterial);

  const checkLoading = useSelector(state => state.reqProduct.loading);
  const ref = useRef();
  const [checkErr, setCheckErr] = useState(false);
  const toastMes = useRef();

  useEffect(() => {
    dispatch(getListReqProduct());
    dispatch(getListReqCurrent());
    dispatch(getDataEmployeelProd());
    dispatch(getDataMaterialProd());
  }, []);

  useEffect(() => {
    setListPlan(dataReqCurrent?.length > 0 ? dataReqCurrent : []);
  }, [dataReqCurrent]);

  const handleDel = codeReq => {
    codeReq && dispatch(deleteReqProduct({codeReq}));
  };

  //console.log(listPlan)
  const addToList = codeReq => {
    const item = listReqProduct.filter(item => item.codeReq === codeReq)[0];
    const difference =
      new Date(convertFormatDate(item.endDate)).getTime() -
      new Date(convertFormatDate(item.startDate)).getTime();
    const countDay = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

   // console.log(countDay);
    if (listPlan?.length === 0) {
      setListPlan([...listPlan, item]);

      dispatch(
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
                        handleRemove(codeReq);
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
      setCheckErr(false);
    } else {
      const check = listPlan.filter(item => item?.codeReq === codeReq)[0];
      if (!check) {
        setListPlan([...listPlan, item]);
        dispatch(
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
                        console.log(status, mess);
                        if (status !== 201) {
                          setCheckErr(true);
                          toastMes.current.show(
                            mess,
                            durableTimeMessage + 1000,
                          );
                          handleRemove(codeReq);
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
        setCheckErr(false);
      }
    }
  };

  const handleRemove = codeReq => {
    const listChoose = listPlan.filter(item => item.codeReq !== codeReq);
    setListPlan(listChoose);
    dispatch(deleteMaterialProd({codeReq}));
    // dispatch(deleteEmployeeProd({codeReq}));
    // dispatch(getListReqCurrent());
  };

  //listPlan?.length > 0 && console.log(listPlan);

  const handleSubmit = () => {
    const product = listPlan[0]?.nameProduct;
    if (!product) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn chưa chọn yêu cầu sản xuất nào !',
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
        <Text style={styles.titleItem}>Quản lý kế hoạch sản xuất</Text>
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
        <View style={styles.containerView}>
          {listReqProduct?.length > 0 && (
            <>
              {checkLoading ? (
                <ActivityIndicator size="large" color="#00ff00" />
              ) : (
                <ListViewReqProduct
                  arrSource={listReqProduct}
                  handleDel={handleDel}
                  addToList={addToList}
                />
              )}
            </>
          )}
        </View>
        <Text style={styles.titleItem2}>Thêm kế hoạch sản xuất</Text>
        <>
          {listPlan?.length > 0 ? (
            <ListViewReqProduct
              arrSource={listPlan}
              handleDel={handleRemove}
              removeIcon
            />
          ) : (
            <View style={styles.viewEmpty}>
              <FontAwesome5
                name={'exclamation-triangle'}
                size={19}
                color="#000"
                //style={styles.deleteIcon}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  marginTop: 2,
                  fontSize: 14.5,
                }}>
                Trống
              </Text>
            </View>
          )}
        </>
        <TouchableOpacity style={styles.sectionSubmit} onPress={handleSubmit}>
          <FontAwesome5
            name={'dolly'}
            size={23}
            color="#fff"
            //style={styles.deleteIcon}
          />
          <Text style={styles.textBtn}>Tiến hành</Text>
        </TouchableOpacity>
        <View style={{marginBottom: 30}}>
          {listPlan?.length > 0 &&
            dataEmployee?.length > 0 &&
            listPlan.map(item => {
              return (
                <>
                  {dataMaterial?.length > 0 && (
                    <View style={styles.viewProcess}>
                      <View style={styles.viewLeft}>
                        <Text style={styles.textProd}>{item.nameProduct}</Text>
                        <Text style={styles.textProd}>({item.codeReq})</Text>
                      </View>
                      <View style={styles.viewRight}>
                        <ListViewProcess
                          codeReq={item.codeReq}
                          arrMaterial={dataMaterial}
                          arrEmployee={dataEmployee}
                        />
                      </View>
                    </View>
                  )}
                </>
              );
            })}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
export default PlanProcessProduct;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    backgroundColor: '#1AA7A7',
    paddingBottom: 50,
  },
  //   wrapSectionInput: {
  //     flex: 1,
  //     width: '100%',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     backgroundColor: '#1AA7A7',
  //     height:'100%'
  //   },
  viewProcess: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 40,
    height: 130,
  },
  textProd: {
    color: 'green',
    // flex: 1,
    fontFamily: 'Montserrat-SemiBold',
    // flexDirection: 'column',
    // paddingLeft: 20,
    fontSize: 16,
  },
  viewLeft: {
    width: '39%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    //height: 130,
  },
  viewRight: {
    width: '61%',
    height: '100%',
    backgroundColor: '#fff',
    //height:130
  },
  textBtn: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 8,
  },
  sectionSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 40,
    marginTop: 50,
    borderWidth: 1.5,
    flexDirection: 'row',
    //backgroundColor:'#265D62',
    borderColor: '#fff',
    borderRadius: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  containerView: {
    display: 'flex',
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
  titleItem2: {
    fontSize: 17,
    width: '100%',
    fontFamily: 'Montserrat-Medium',
    color: '#454444',
    marginBottom: 30,
    padding: 10,
    marginTop: -20,
  },
  viewEmpty: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
