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
  createCategoryEmployee,
  deleteCategoryEmployee,
  getListCategoryEmployee,
} from '../categoryAction';
import ListCategoryEmployee from '../../../components/ListCategoryEmployee';
import { formatToList, formatToListOptionType } from '../../../utils/function';
import { listTypeEm } from '../../../contants/listNamTypeEmployee';

function ListEmployee() {
  const dispatch = useDispatch();
  const dataEmployee = useSelector(
    state => state.category.listCategoryEmployee,
  );
  const checkLoading = useSelector(state => state.category.loading);
  const ref = useRef();
  const toastMes = useRef();
  const [name, setName] = useState('');
  const [indexPay, setIndexPay] = useState(0);
  const [checkErr, setCheckErr] = useState(false);

  useEffect(() => {
    dispatch(getListCategoryEmployee());
  }, []);

  const listNameTypeEm = formatToList(listTypeEm);

  const isFloat = n => {
    return Number(n) === n && n % 1 !== 0;
  };

  const handleSetIndexPay = val => {
    if (isFloat(+val)) {
      setIndexPay(+val);
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!name) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải chọn loại nhân viên !',
        durableTimeMessage,
      );
    }

    if (indexPay === 0) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền hệ số lương !',
        durableTimeMessage,
      );
    }

    dispatch(
      createCategoryEmployee({
        name,
        indexPayslip: indexPay,
        callback: async (status, res) => {
          await setCheckErr(!(status === 201));
          if (status === 201) {
            setName(null);
            //setIndexPay(0);
          }
          return (
            status !== 201 && toastMes.current.show(res, durableTimeMessage)
          );
        },
      }),
    );
  };

  async function handleDelete(item) {
    item && (await dispatch(deleteCategoryEmployee({name: item})));
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
          <Text style={styles.warningPayslip}>
            Mức lương cơ bản : 1,6 triệu đồng / tháng
          </Text>
          <View style={styles.containerItem}>
            <View style={styles.sectionItem}>
              <Text style={styles.titleText}>Chọn loại nhân viên</Text>
              {/* <TextInput
                value={name}
                autoCorrect={false}
                style={styles.textView}
                onChangeText={val => setName(val)}
              /> */}
              <View style={styles.viewOption}>
                <RNPickerSelect
                  onValueChange={value => setName(value)}
                  pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                  items={listNameTypeEm}
                  placeholder={{label: 'Chọn loại nhân viên', value: ''}}
                  value={name}
                  style={styles.selectView}
                />
              </View>
            </View>
            <View style={styles.sectionItem3}>
              <Text style={styles.titleText}>Hệ số lương</Text>
              <TextInput
                value={indexPay}
                autoCorrect={false}
                style={styles.textView}
                onChangeText={handleSetIndexPay}
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
            {dataEmployee?.length > 0 && (
              <>
                {checkLoading ? (
                  <ActivityIndicator size="large" color="#00ff00" />
                ) : (
                  <ListCategoryEmployee
                    arrSource={dataEmployee}
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

export default ListEmployee;

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
    justifyContent: 'space-between',
    width: '65%',
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
    marginTop: 50,
    borderWidth: 1.5,
    //backgroundColor:'#265D62',
    borderColor: '#fff',
    borderRadius: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
