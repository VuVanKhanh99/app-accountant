import React, {useState, useEffect} from 'react';
import {LogBox} from 'react-native';
import _, {create} from 'lodash';
// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

LogBox.ignoreLogs(['componentWillReceiveProps']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('componentWillReceiveProps') <= -1) {
    _console.warn(message);
  }
};

//import DatePicker from the package we installed
import DatePicker,{ registerLocale } from 'react-native-datepicker';

const DatePickerInput = props => {
  const {handleDay, dayData} = props; 

  const [date, setDate] = useState(moment(new Date()).utc().format('DD-MM-YYYY'));

  useEffect(() => {
    handleDay(date);
  }, [date]);

  useEffect(() => {
    handleDay && dayData && setDate(dayData);
  }, [dayData]);

  function created() {
    LogBox.ignoreLogs([
      'DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release.',
      'StatusBarIOS has been merged with StatusBar and will be removed in a future release.',
      'DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.',
    ]);
  }
  created();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
              width: 40,
              height: 40,
              marginBottom: 30,
            },
            dateInput: {
              paddingLeft: 20,
              borderColor: '#fff',
              color: '#fff',
            },
            dateText: {
              color: '#fff',
              fontSize: 17,
              fontFamily: 'Gluten-ExtraLight',
            },
          }}
          onDateChange={date => {
            setDate(date);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DatePickerInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '104%',
    marginLeft:"-1.1%",
    borderRadius:5
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  datePickerStyle: {
    width: '100%',
    marginTop: -10,
    borderColor: '#fff',
    color: '#fff',
    borderRadius: 10,
    borderRadius:5
    // display:'flex',
    // alignItems:'center',
    // flexDirection:'row'
  },
});
