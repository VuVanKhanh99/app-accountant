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
  useWindowDimensions,
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
import {getListCategoryEmployee} from '../../Category/categoryAction';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  createManagerEmployee,
  deleteIndexInsurance,
  getIndexInsurance,
  createAccountantEm,
} from '../systemAction';
import {
  indexSuranceEm,
  indexSuranceCom,
} from '../../../contants/indexValueInsurannces';
import ListViewInsurance from '../../../components/ListViewInsurance';
import InsuranceCompany from './InsuranceCompany';

const ManageEmployee = () => {
  const dispatch = useDispatch();
  const listCategoryEmployee = useSelector(
    state => state.category.listCategoryEmployee,
  );
  const dataAccountantEm = useSelector(state => state.system.dataAccountantEm);
  const dataIndexInsurance = useSelector(
    state => state.system.dataIndexInsurance,
  );
  const listEmployee =
    listCategoryEmployee?.length > 0 &&
    formatToListOptionType(listCategoryEmployee);
  const ref = useRef();
  const toastMes = useRef();
  const [typeEm, setTypeEm] = useState(listEmployee[0]?.value);
  const checkLoading = useSelector(state => state.system.loading);
  const checkLoaddingEm = useSelector(state => state.system.loadingAccountEm);
  const [quantityType, setQuantityType] = useState(0);
  const [checkErr, setCheckErr] = useState(false);
  const [checkMess, setCheckMess] = useState(null);
  const [reRen, setReRen] = useState(true);

  useEffect(() => {
    dispatch(getListCategoryEmployee());
    dispatch(
      getIndexInsurance({
        callback: mess => {
          setCheckMess(mess);
        },
      }),
    );
    dispatch(createAccountantEm());
  }, []);

  const isFloat = n => {
    return Number(n) === n && n % 1 !== 0;
  };

  const isInt = n => {
    return Number(n) === n && n % 1 === 0;
  };

  const handleSetQuantityType = val => {
    if (val % 1 === 0) {
      setQuantityType(val);
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (typeEm === '') {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải chọn loại nhân viên !',
        durableTimeMessage,
      );
    }

    if (quantityType === 0) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền số lượng của loại nhân viên đang chọn !',
        durableTimeMessage,
      );
    }

    setCheckErr(false);

    dispatch(
      createManagerEmployee({
        typeEm: typeEm,
        quantityEm: quantityType,
        callbackCre: async (status, res, mess) => {
        //  console.log(res);
          await setCheckErr(!(status === 201));
          setCheckMess(mess);
          return (
            status !== 201 && toastMes.current.show(res, durableTimeMessage)
          );
        },
      }),
    );
  };

  async function handleDelete(item) {
    item &&
      (await dispatch(
        deleteIndexInsurance({
          typeEm: item,
          callbackDel: async mess => {
            setCheckMess(mess);
          },
        }),
      ));
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
          <Text style={styles.titleItem}>Quản lý nhân viên</Text>
          <View style={styles.containerItem}>
            <View style={styles.sectionItem}>
              <Text style={styles.titleText}>
                Loại nhân viên <Text style={styles.markRequire}>*</Text>
              </Text>
              {listEmployee?.length > 0 ? (
                <View style={styles.viewOption}>
                  <RNPickerSelect
                    onValueChange={value => setTypeEm(value)}
                    pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                    items={listEmployee}
                    placeholder={{label: 'Chọn loại nhân viên', value: ''}}
                    value={typeEm}
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
              <Text style={styles.titleText}>
                Số lượng <Text style={styles.markRequire}>*</Text>
              </Text>
              <TextInput
                value={quantityType}
                autoCorrect={false}
                style={styles.textView}
                onChangeText={handleSetQuantityType}
              />
            </View>
          </View>
          <View style={styles.containerItem}>
            <View style={styles.sectionItem3}>
              <Text style={styles.titleText}>
                Bảo hiểm xã hội <Text style={styles.markRequire}>*</Text>
              </Text>
              <View
                style={{position: 'relative', width: '100%', height: '100%'}}>
                <TextInput
                  value={`${indexSuranceEm.BHXH}`}
                  autoCorrect={false}
                  style={styles.textView}
                  editable={false}
                  // onChangeText={handleSetBHXH}
                />
                <Text
                  style={{
                    position: 'absolute',
                    fontSize: 16,
                    fontFamily: 'OpenSans-Medium',
                    marginLeft: '88%',
                    marginTop: '4.5%',
                  }}>
                  {'%'}
                </Text>
              </View>
            </View>
            <View style={styles.sectionItem4}>
              <Text style={styles.titleText}>
                Bảo hiểm y tế <Text style={styles.markRequire}>*</Text>
              </Text>
              <View
                style={{position: 'relative', width: '100%', height: '100%'}}>
                <TextInput
                  value={`${indexSuranceEm.BHYT}`}
                  autoCorrect={false}
                  style={styles.textView}
                  editable={false}
                  //onChangeText={handleSetBHYT}
                />
                <Text
                  style={{
                    position: 'absolute',
                    fontSize: 16,
                    fontFamily: 'OpenSans-Medium',
                    marginLeft: '88%',
                    marginTop: '4.5%',
                  }}>
                  {'%'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.containerItem}>
            <View style={styles.sectionItem5}>
              <Text style={styles.titleText}>
                Bảo hiểm tự nguyện <Text style={styles.markRequire}>*</Text>
              </Text>
              <View
                style={{position: 'relative', width: '100%', height: '100%'}}>
                <TextInput
                  value={`${indexSuranceEm.BHTN}`}
                  editable={false}
                  autoCorrect={false}
                  style={styles.textView}
                  //onChangeText={handleSetBHTN}
                />
                <Text
                  style={{
                    position: 'absolute',
                    fontSize: 16,
                    fontFamily: 'OpenSans-Medium',
                    marginLeft: '94%',
                    marginTop: '2%',
                  }}>
                  {'%'}
                </Text>
              </View>
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
          {checkMess &&
            (() => {
              const text1 = checkMess.slice(0, checkMess?.length - 21);
              const text2 = checkMess.slice(
                checkMess?.length - 21,
                checkMess?.length,
              );
              return (
                <>
                  {
                    <View style={styles.viewMess}>
                      <Text style={styles.textMess}>
                        {`  ${text1} 
                               ${text2}
                    `}
                      </Text>
                    </View>
                  }
                </>
              );
            })()}
          <View style={styles.listView}>
            {dataIndexInsurance?.length > 0 && (
              <>
                {checkLoading ? (
                  <ActivityIndicator size="large" color="#00ff00" />
                ) : (
                  <>
                    <ListViewInsurance
                      arrSource={dataIndexInsurance}
                      handleDelete={handleDelete}
                    />
                    {!checkMess && !checkLoaddingEm ? (
                      <View style={styles.viewAccountant}>
                        <Text style={styles.desCost}>
                          Trích vào lương của nhân viên (Hạch toán theo thông tư
                          133)
                        </Text>
                        <View style={styles.viewItemAccount}>
                          <View style={styles.red334}>
                            <Text style={styles.text334}>Nợ TK – 334</Text>
                          </View>
                          <Text style={styles.textMoneyRed}>
                            {'  '}
                            {`${dataAccountantEm?.red334}đ`}
                          </Text>
                        </View>
                        <View style={styles.viewItemAccount}>
                          <View style={styles.green3383}>
                            <Text style={styles.text334}>
                              Có TK – 3383 (BHXH)
                            </Text>
                          </View>
                          <Text style={styles.textMoneyGreen}>
                            {'  '}
                            {`${dataAccountantEm?.green3383}đ`}
                          </Text>
                        </View>
                        <View style={styles.viewItemAccount}>
                          <View style={styles.green3383}>
                            <Text style={styles.text334}>
                              Có TK – 3384 (BHYT)
                            </Text>
                          </View>
                          <Text style={styles.textMoneyGreen}>
                            {'  '}
                            {`${dataAccountantEm?.green3384}đ`}
                          </Text>
                        </View>
                        <View style={styles.viewItemAccount}>
                          <View style={styles.green3383}>
                            <Text style={styles.text334}>
                              Có TK – 3385 (BHTN)
                            </Text>
                          </View>
                          <Text style={styles.textMoneyGreen}>
                            {'  '}
                            {`${dataAccountantEm?.green3385}đ`}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <ActivityIndicator size="large" color="#00ff00" />
                    )}
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const ManageInsurance = () => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();

  const [routes] = React.useState([
    {
      key: 'employee',
      title: 'Nhân viên',
    },
    {key: 'company', title: 'Công ty'},
  ]);

  function renderLabel({route, focused}) {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          alignContent: 'center',
        }}>
        <FontAwesome5
          name={route.key === 'employee' ? 'users' : 'building'}
          fontSize={19}
          color={focused ? '#2FCA9E' : '#fff'}
          style={{top: '6%'}}
        />
        <Text style={[focused ? styles.labelTabMenuAc : styles.labelTabMenu]}>
          {' '}
          {route.title}
        </Text>
      </View>
    );
  }

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={({route, jumpTo}) => {
        switch (route.key) {
          case 'employee':
            return <ManageEmployee indexPage={index} />;
          case 'company': {
            return <InsuranceCompany indexPage={index} />;
          }
          default:
            return null;
        }
      }}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      bounces={false}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: '#2FCA9E'}}
          renderLabel={renderLabel}
          style={{backgroundColor: '#555858'}}
        />
      )}
      tabBarPosition={'top'}
    />
  );
};
export default ManageInsurance;

const styles = StyleSheet.create({
  red334: {
    backgroundColor: '#F72D0D',
    padding: 3,
    borderRadius: 3,
    width: '56%',
  },
  desCost: {
    marginBottom: 15,
    paddingTop: 13,
    fontSize: 17,
    color: '#964D45',
    fontFamily: 'OpenSans_SemiCondensed-Italic',
  },
  green3383: {
    backgroundColor: '#23B28E',
    padding: 3,
    borderRadius: 3,
    width: '56%',
  },
  text334: {
    color: '#fff',
    fontFamily: 'OpenSans-Medium',
  },
  textMoneyRed: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    width: '48%',
    flex: 7,
    alignItems: 'center',
    flexWrap: 'nowrap',
    color: '#F72D0D',
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
    width: '69%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    justifyContent: 'center',
  },
  sectionItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '65%',
    height: '100%',
  },
  viewAccountant: {
    backgroundColor: '#fff',
    width: '100%',
    height: 240,
    marginTop: '-70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
    paddingBottom: 30,
  },
  sectionItem2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%',
    height: '100%',
  },
  sectionItem3: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '47.5%',
    height: '100%',
  },
  labelTabMenuAc: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 17,
    color: '#2FCA9E',
  },
  labelTabMenu: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 17,
    color: '#fff',
  },
  sectionItem4: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '47.5%',
    height: '100%',
  },
  sectionItem5: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  containerItem: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    marginTop: 30,
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
    marginBottom: 1,
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
  viewMess: {
    marginTop: 20,
    flex: 5,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
  },
  textMess: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: 'OpenSans-Medium',
    fontSize: 16,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
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
