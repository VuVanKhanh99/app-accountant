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
import ListCategoryEmployee from '../../../components/ListCategoryEmployee';
import {
  formartToCurrency,
  formatToList,
  formatToListOptionType,
} from '../../../utils/function';
import {listTypeEm, listTypeTSCD} from '../../../contants/listNamTypeEmployee';
import {
  createAccountTSCD,
  createPeakTSCD,
  deleteTSCD,
  getAccountTSCD,
  getTSCD,
} from '../systemAction';
import ListViewTSCD from '../../../components/ListViewTSCD';

function TSCD() {
  const dispatch = useDispatch();
  const ref = useRef();
  const toastMes = useRef();
  const [nameType, setNameType] = useState('');
  const [peak, setPeak] = useState('');
  const [checkErr, setCheckErr] = useState(false);
  const [payCost, setPayCost] = useState('');
  const dataTSCD = useSelector(state => state.system.dataTSCD);
  const dataAccountTSCD = useSelector(state => state.system.dataAccountTSCD);
  const listNameTypeTSCD = formatToList(listTypeTSCD);
  const checkLoading = useSelector(state => state.system.loading);

  useEffect(() => {
    dispatch(getTSCD());
    dispatch(createAccountTSCD());
  }, []);


  const handleSubmit = async () => {
    if (!nameType) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải chọn loại khấu hao !',
        durableTimeMessage,
      );
    }

    if (!peak) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn chưa điền tên khấu hao !',
        durableTimeMessage,
      );
    }

    if (!payCost) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn chưa điền chi phí khấu hao !',
        durableTimeMessage,
      );
    }

    dispatch(
      createPeakTSCD({
        nameType,
        peak,
        payCost,
        callback: async (status, res) => {
          await setCheckErr(!(status === 201));
          if (status === 201) {
            setNameType('');
            setPeak('');
            setPayCost('');
          }
          return (
            status !== 201 && toastMes.current.show(res, durableTimeMessage)
          );
        },
      }),
    );
  };

  const handleSetPayCost = item => {
    const checkPrice = item.toString().split(',').join('');
    if (checkPrice % 1 === 0) {
      setPayCost(formartToCurrency(checkPrice));
    } else {
      return false;
    }
  };

  async function handleDelete(item) {
    item && (await dispatch(deleteTSCD({id: item})));
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
          <Text style={styles.titleItem}>Kế toán chi phí TSCĐ</Text>
          <View style={styles.containerItem}>
            <View style={styles.sectionItem}>
              <Text style={styles.titleText}>Chọn loại khấu hao TSCD</Text>
              <View style={styles.viewOption}>
                <RNPickerSelect
                  onValueChange={value => setNameType(value)}
                  pickerProps={{style: {height: 50, overflow: 'hidden'}}}
                  items={listNameTypeTSCD}
                  placeholder={{label: 'Chọn loại khấu hao', value: ''}}
                  value={nameType}
                  style={styles.selectView}
                />
              </View>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.titleText}>Nhập khấu hao</Text>
              <View style={styles.viewOption}>
                <TextInput
                  value={peak}
                  autoCorrect={false}
                  style={styles.textView}
                  onChangeText={val => setPeak(val)}
                />
              </View>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.titleText}>Nhập số tiền hao mòn</Text>
              <View style={styles.viewOption}>
                <TextInput
                  value={payCost}
                  autoCorrect={false}
                  style={styles.textView}
                  onChangeText={handleSetPayCost}
                />
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
          <View style={styles.listView}>
            {dataTSCD?.length > 0 && (
              <>
                {checkLoading ? (
                  <ActivityIndicator size="large" color="#00ff00" />
                ) : (
                  <ListViewTSCD
                    arrList={dataTSCD}
                    arrTotal={dataAccountTSCD}
                    handleDel={handleDelete}
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

export default TSCD;

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
    marginTop: 185,
    borderWidth: 1.5,
    //backgroundColor:'#265D62',
    borderColor: '#fff',
    borderRadius: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
