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
} from 'react-native';
import Toast from 'react-native-easy-toast';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import {durableTimeMessage} from '../../../app/contants/message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  formatToListOption,
  removeWhiteBetweenWord,
} from '../../../utils/function';
import {createProcess, getListProcess, deleteProcess} from '../categoryAction';
import ListView from '../../../components/ListView';

function CreateProcess() {
  const dispatch = useDispatch();
  const dataListProcess = useSelector(state => state.category.listProcess);
  const checkLoading = useSelector(state => state.category.loading);
  const ref = useRef();
  const toastMes = useRef();
  const [name, setName] = useState('');
  const [checkErr, setCheckErr] = useState(false);

  useEffect(() => {
    dispatch(getListProcess());
  }, []);


  const handleSubmit = async () => {
    if (!name) {
      setCheckErr(true);
      return toastMes.current.show(
        'Bạn phải điền tên công đoạn!',
        durableTimeMessage,
      );
    }
    dispatch(
      createProcess({
        name,
        callback: async (status, res) => {
          await setCheckErr(!(status === 201));
          (status === 201) && setName('');
          return toastMes.current.show(res, durableTimeMessage);
        },
      }),
    );
  };

  async function handleDelete(item) {
    item && (await dispatch(deleteProcess({nameProcess: item})));
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
          <View style={styles.containerItem}>
            <Text style={styles.titleItem}>Quản lý công đoạn</Text>
            <View style={{position: 'relative', width: '100%', height: '100%'}}>
              <TextInput
                value={name}
                autoCorrect={false}
                style={styles.textView}
                onChangeText={val => setName(val)}
              />
            </View>
            <FontAwesome5
              name={'plus'}
              size={23}
              style={styles.addIcon}
              onPress={handleSubmit}
            />
          </View>
          <View style={styles.containerItem2}>
            {dataListProcess?.length > 0 && (
              <>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    borderRadius: 5,
                  }}>
                  {checkLoading ? (
                    <ActivityIndicator size="large" color="#00ff00" />
                  ) : (
                    <ListView
                      arrSource={dataListProcess}
                      handleDelete={handleDelete}
                    />
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default CreateProcess;

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
    //alignItems: 'center',
    marginTop: 40,
    padding: 10,
    // backgroundColor:'red'
  },
  containerItem: {
    flex: 2,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  containerItem2: {
    flex: 2,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 70,
  },
  titleItem: {
    fontSize: 22,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    color: '#fff',
    marginBottom: 30,
  },
  textView: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
    fontSize: 14,
    position: 'absolute',
    paddingLeft: 10,
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
  btnSubmit: {
    width: '100%',
    height: 60,
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: '#145E65',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markRequire: {
    color: '#8F0404',
  },
  addIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginTop: '17%',
    left: '89.5%',
    zIndex: 10,
  },
});
