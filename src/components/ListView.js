import React, {useEffect, useRef, useState, createRef} from 'react';
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

function ListView(props) {
  const {arrSource,handleDelete} = props;
  const ref = useRef();
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    if (arrSource.length > 0) {
      getToListName(arrSource)?.length > 0 &&
        setListItem(getToListName(arrSource));
    }
  }, [arrSource]);


  return (
    <View style={{flex: 1, height: 500}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        ref={ref}>
        <KeyboardAvoidingView behavior="padding" style={styles.viewOutside}>
          <View style={styles.container}>
            {listItem.length > 0 &&
              listItem.map(item => (
                <View style={styles.viewItem}>
                  <Text style={styles.textItem}>{item}</Text>
                  <FontAwesome5
                    name={'trash-alt'}
                    size={17}
                    color="#000"
                    style={styles.deleteIcon}
                    onPress={() => handleDelete(item)}
                  />
                </View>
              ))}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default ListView;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    backgroundColor: '#1AA7A7',
    paddingBottom: 30,
    flex: 1,
  },
  viewOutside: {
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
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
  textItem: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  deleteIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginTop: '9%',
    left: '99.8%',
    zIndex: 10,
  },
});
