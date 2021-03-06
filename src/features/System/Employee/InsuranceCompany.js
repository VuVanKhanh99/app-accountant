import React, {useState, useRef, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import {useDispatch, useSelector} from 'react-redux';
import {
  createConsultInfo133,
  createCostConsult133,
  getIndexInsurance,
} from '../systemAction';
import ViewRotate from './ViewRotate';
import {getListCategoryEmployee} from '../../Category/categoryAction';
import {
  checkConsultInfo133,
  convertCurrencyToNumber,
  formartToCurrency,
  formatToListOptionType,
  getToListName,
  isString,
} from '../../../utils/function';
import {listTypeEm} from '../../../contants/listNamTypeEmployee';

function InsuranceCompany(props) {
  const dispatch = useDispatch();
  const ref = useRef();
  const toastMes = useRef();
  const listCategoryEmployee = useSelector(
    state => state.category.listCategoryEmployee,
  );
  const listEmployee = getToListName(listCategoryEmployee);
  const dataInfo133 = useSelector(state => state.system.dataConsultInfo133);
  const dataCost133 = useSelector(state => state.system.dataCostConsult133);
  const dataAccountantEm = useSelector(state => state.system.dataAccountantEm);

  const [checkErr, setCheckErr] = useState(false);
  const [checkMess, setCheckMess] = useState(null);

  useEffect(() => {
    dispatch(getListCategoryEmployee());
  }, []);

  useEffect(() => {
    dispatch(createConsultInfo133());
  }, [checkMess]);

  useEffect(() => {
    dispatch(
      getIndexInsurance({
        callback: async mess => {
          setCheckMess(mess);
          if (!mess) {
            dispatch(createConsultInfo133());
          }
        },
      }),
    );
  }, [props?.indexPage]);

  const payWage = () => {
    const dataTotal = convertCurrencyToNumber(dataInfo133?.green334);
    const data = dataAccountantEm?.red334;
    const tk111 = +dataTotal - +convertCurrencyToNumber(data);

    return (
      <>
        <View style={styles.viewItemAccount}>
          <View style={styles.red334}>
            <Text style={styles.text334}>N??? TK ??? 334</Text>
          </View>
          <Text style={styles.textMoneyRedFirst}>
            {'  '}
            {`${formartToCurrency(tk111)}??`}
          </Text>
        </View>
        <View style={styles.viewItemAccount}>
          <View style={styles.green3383}>
            <Text style={styles.text334}>C?? TK ??? 111</Text>
          </View>
          <Text style={styles.textMoneyGreen}>
            {'  '}
            {`${formartToCurrency(tk111)}??`}
          </Text>
        </View>
      </>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      ref={ref}>
      <>
        {checkMess ? (
          <ErrorPage />
        ) : (
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.wrapSectionInput}>
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
            </View>
            <ViewRotate />
            <View style={styles.listView}>
              <Text style={styles.account}>H???ch to??n th??ng t?? 133</Text>
              {checkConsultInfo133(dataInfo133?.red154) && (
                <View style={styles.viewItemAccount}>
                  <View style={styles.red334}>
                    <Text style={styles.text334}>N??? TK ??? 154</Text>
                  </View>
                  <Text style={styles.textMoneyRedFirst}>
                    {'   '}
                    {`${dataInfo133?.red154}??`}
                  </Text>
                </View>
              )}
              {checkConsultInfo133(dataInfo133?.red6412) && (
                <View style={styles.viewItemAccount}>
                  <View style={styles.red334}>
                    <Text style={styles.text334}>N??? TK ??? 6412</Text>
                  </View>
                  <Text style={styles.textMoneyGreen}>
                    {'  '}
                    {`${dataInfo133?.red6412}??`}
                  </Text>
                </View>
              )}
              {checkConsultInfo133(dataInfo133?.red6422) && (
                <View style={styles.viewItemAccount}>
                  <View style={styles.red334}>
                    <Text style={styles.text334}>N??? TK ??? 6422</Text>
                  </View>
                  <Text style={styles.textMoneyGreen}>
                    {'  '}
                    {`${dataInfo133?.red6422}??`}
                  </Text>
                </View>
              )}
              {checkConsultInfo133(dataInfo133?.green334) && (
                <View style={styles.viewItemAccount}>
                  <View style={styles.green3383}>
                    <Text style={styles.text334}>C?? TK ??? 334</Text>
                  </View>
                  <Text style={styles.textMoneyGreen}>
                    {'  '}
                    {`${dataInfo133?.green334}??`}
                  </Text>
                </View>
              )}
              <Text style={styles.desCost}>Tr??ch v??o chi ph?? doanh nghi???p</Text>
              {checkConsultInfo133(dataCost133?.red154) && (
                <View style={styles.viewItemAccount}>
                  <View style={styles.red334}>
                    <Text style={styles.text334}>N??? TK ??? 154</Text>
                  </View>
                  <Text style={styles.textMoneyRed}>
                    {'  '}
                    {`${dataCost133?.red154}??`}
                  </Text>
                </View>
              )}
              {checkConsultInfo133(dataCost133?.red6412) && (
                <View style={styles.viewItemAccount}>
                  <View style={styles.red334}>
                    <Text style={styles.text334}>N??? TK ??? 6412</Text>
                  </View>
                  <Text style={styles.textMoneyRed}>
                    {'  '}
                    {`${dataCost133?.red6412}??`}
                  </Text>
                </View>
              )}
              {checkConsultInfo133(dataCost133?.red6422) && (
                <View style={styles.viewItemAccount}>
                  <View style={styles.red334}>
                    <Text style={styles.text334}>N??? TK ??? 6422</Text>
                  </View>
                  <Text style={styles.textMoneyRed}>
                    {'  '}
                    {`${dataCost133?.red6422}??`}
                  </Text>
                </View>
              )}
              {checkConsultInfo133(dataCost133?.green3382) && (
                <View style={styles.viewItemAccount}>
                  <View style={styles.green3383}>
                    <Text style={styles.text334}>C?? TK ??? 3382(KPC??)</Text>
                  </View>
                  <Text style={styles.textMoneyGreen}>
                    {'  '}
                    {`${dataCost133?.green3382}??`}
                  </Text>
                </View>
              )}
              {checkConsultInfo133(dataCost133?.green3383) && (
                <View style={styles.viewItemAccount}>
                  <View style={styles.green3383}>
                    <Text style={styles.text334}>C?? TK ??? 3383(BHXH)</Text>
                  </View>
                  <Text style={styles.textMoneyGreen}>
                    {'  '}
                    {`${dataCost133?.green3383}??`}
                  </Text>
                </View>
              )}
              {checkConsultInfo133(dataCost133?.green3384) && (
                <View style={styles.viewItemAccount}>
                  <View style={styles.green3383}>
                    <Text style={styles.text334}>C?? TK ??? 3384(BHYT)</Text>
                  </View>
                  <Text style={styles.textMoneyGreen}>
                    {'  '}
                    {`${dataCost133?.green3384}??`}
                  </Text>
                </View>
              )}
              {checkConsultInfo133(dataCost133?.green3385) && (
                <View style={styles.viewItemAccount}>
                  <View style={styles.green3383}>
                    <Text style={styles.text334}>C?? TK ??? 3385(BHTN)</Text>
                  </View>
                  <Text style={styles.textMoneyGreen}>
                    {'  '}
                    {`${dataCost133?.green3385}??`}
                  </Text>
                </View>
              )}
              <Text style={styles.desCost}>H???ch to??n khi tr??? l????ng</Text>
              {payWage()}
            </View>
          </KeyboardAvoidingView>
        )}
      </>
    </ScrollView>
  );
}

export const ErrorPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles?.errPage}>
        <Text style={styles.textErrMain}>Oops !</Text>
        <Text style={styles.desErr}>
          B???n c???n ph???i ho??n t???t k??? to??n b??n t??i kho???n nh??n vi??n !
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    backgroundColor: '#1AA7A7',
    paddingBottom: 60,
  },
  account: {
    fontSize: 17,
    fontFamily: 'OpenSans_SemiCondensed-Italic',
    color: '#964D45',
    marginBottom: 20,
  },
  textErrMain: {
    fontSize: 25,
    fontFamily: 'OpenSans_SemiCondensed-Italic',
  },
  desCost: {
    marginTop: 23,
    fontSize: 17,
    color: '#964D45',
    fontFamily: 'OpenSans_SemiCondensed-Italic',
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
  wrapSectionInput: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1AA7A7',
  },
  desErr: {
    fontFamily: 'OpenSans_SemiCondensed-SemiBold',
    fontSize: 17,
    marginTop: 5,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  red334: {
    backgroundColor: '#F72D0D',
    padding: 3,
    borderRadius: 3,
    width: '56%',
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
  textMoneyRedFirst: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    width: '49%',
    flex: 7,
    marginTop: -18,
    alignItems: 'center',
    left: '3%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    color: '#F72D0D',
  },
  textMoneyGreenFirst: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    width: '49%',
    flex: 7,
    marginTop: -18,
    alignItems: 'center',
    left: '3%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    color: '#23B28E',
  },
  textMoneyGreen: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    width: '48%',
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
  listView: {
    marginTop: 50,
    width: '106%',
    marginLeft: '-3%',
    backgroundColor: '#fff',
    height: 600,
    padding: 20,
    paddingLeft: 40,
  },
  color: {
    textColor: '#red',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default InsuranceCompany;
