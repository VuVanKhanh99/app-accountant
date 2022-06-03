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
import RNPickerSelect from 'react-native-picker-select';
import {getToListName} from '../utils/function';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {getListMaterials, deleteMaterial} from '../materialActions';
import Toast from 'react-native-easy-toast';
import {durableTimeMessage} from '../../../app/contants/message';
import ListViewMa from '../../../components/ListViewMa';

function ListMaterialItem() {
  const ref = useRef();
  const dispatch = useDispatch();
  const toastMes = useRef();
  const dataMaterial = useSelector(state => state.material.listMaterial);
  const [checkErr, setCheckErr] = useState(false);

  useEffect(() => {
    dispatch(getListMaterials());
  }, []);

  const handleDelete = item => {
    item &&
      dispatch(
        deleteMaterial({
          name: item,
          callback: (status, res) => {
            setCheckErr(!(status === 201));
            // if (status === 201) {
            //   setName(null);
            //   setPrice(null);
            // }
            //console.log(res, status);
            toastMes.current.show(res, durableTimeMessage);
          },
        }),
      );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      ref={ref}>
      <KeyboardAvoidingView behavior="padding" style={styles.viewOutside}>
        <View style={styles.containerOut}>
          <Text style={styles.titleItem}>Quản lý vật tư</Text>
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
          {dataMaterial?.length > 0 ? (
            <ListViewMa
              dataMaterial={dataMaterial}
              handleDelete={handleDelete}
            />
          ) : (
            <View style={styles?.errPage}>
              <Text style={styles.textErrMain}>Oops !</Text>
              <Text style={styles.desErr}>
                Danh sách vật tư đang trống !
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default ListMaterialItem;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    backgroundColor: '#1AA7A7',
    paddingBottom: 30,
    flex: 1,
  },
  containerOut: {
    width: '100%',
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
  viewOutside: {
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 67,
    // marginBottom: 10,
  },
  containerItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    //height: 40,
    paddingBottom: 1.5,
    marginTop: 4,
    paddingTop: 5,
    paddingBottom: 5,
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
  viewLanding: {
    padding: 10,
    width: '120%',
    backgroundColor: '#fff',
  },
  viewItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    height: 60,
  },
  unitView: {
    width: '18%',
    display: 'flex',
    justifyContent: 'center',
  },
  labelRow: {
    fontSize: 16,
    width: '100%',
    fontFamily: 'OpenSans-Bold',
    flexWrap: 'wrap',
    //  fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  labelRowCenter: {
    fontSize: 16,
    width: '100%',
    fontFamily: 'OpenSans-Bold',
    //  fontFamily: 'OpenSans-Regular',
    color: '#000',
    textAlign: 'center',
  },
  itemText: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  textTime: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    color: '#000',
    left: '10%',
    position: 'absolute',
  },
  itemTextCenter: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
    textAlign: 'center',
  },
  itemTextPrice: {
    fontSize: 15,
    width: '70%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
    position: 'absolute',
  },
  deleteIcon: {
    width: '10%',
    height: '100%',
    top: '20%',
    position: 'absolute',
    left: '68%',
  },
  preView: {
    width: '30%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  midView: {
    width: '13%',
  },
  endView: {
    width: '28%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    left: '1%',
  },
  viewRedundant: {
    width: '5%',
  },
});
