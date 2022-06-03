import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

function SubItem(props) {
  const {checksb, handleSubmit, loading, listProcess} = props;
  const [redundantRe, setRedundantRe] = useState('');
  const [process, setProcess] = useState('');
  const [durable, setDurable] = useState(0);
  const [person, setPerson] = useState(0);

  const valueItem = (arr, val) => {
    return arr.filter(item => item.value === val)[0]?.label;
  };

  useEffect(() => {
    checksb &&
      handleSubmit(
        redundantRe,
        valueItem(listProcess, process),
        durable,
        person,
      );
  }, [checksb]);

  return (
    <>
      <View style={styles.containerItem}>
        <Text style={styles.titleItem}>Tồn thực tế</Text>
        <TextInput
          placeholder=""
          value={redundantRe}
          autoCorrect={false}
          style={styles.textView}
          onChangeText={val => setRedundantRe(val)}
        />
      </View>
      {!loading && listProcess.length > 0 ? (
        <View style={styles.containerItem}>
          <Text style={styles.titleItem}>Công đoạn</Text>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              borderRadius: 5,
            }}>
            <RNPickerSelect
              onValueChange={value => setProcess(value)}
              pickerProps={{style: {height: 50, overflow: 'hidden'}}}
              items={listProcess}
              placeholder={{label: 'Chọn công đoạn', value: ''}}
              value={process}
              style={styles.selectView}
              textInputProps={{style: {backgroundColor: 'blue'}}}
              touchableWrapperProps={{style: {backgroundColor: 'blue'}}}
            />
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
      <View style={styles.containerItem}>
        <Text style={styles.titleItem}>Thời gian thực hiện (phút)</Text>
        <TextInput
          value={durable}
          keyboardType="numeric"
          autoCorrect={false}
          style={styles.textView}
          onChangeText={val => val % 1 === 0 && setDurable(val ?? 0)}
        />
      </View>
      <View style={styles.containerItem}>
        <Text style={styles.titleItem}>Nhân công (người)</Text>
        <TextInput
          value={person}
          keyboardType="numeric"
          autoCorrect={false}
          style={styles.textView}
          onChangeText={val => val % 1 === 0 && setPerson(val ?? 0)}
        />
      </View>
    </>
  );
}

export default SubItem;

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
    marginTop: 30,
  },
  titleItem: {
    fontSize: 17,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
  },
  textView: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
    fontSize: 14,
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
  markRequire: {
    color: '#8F0404',
  },
});
