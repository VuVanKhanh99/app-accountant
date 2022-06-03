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

function ListViewRecipe(props) {
  const ref = useRef();
  const {arrSource, handleDelete} = props;
  const [listItem, setListItem] = useState([]);

  return (
    <View style={{flex: 1, height: 250,backgroundColor:'#fff !important'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        ref={ref}>
        <KeyboardAvoidingView behavior="padding" style={styles.viewOutside}>
          <View style={styles.viewLanding}>
            <View style={styles.container}>
              <View style={styles.preView}>
                <Text style={styles.labelRow}>Đầu ra</Text>
              </View>
              <View style={styles.midView}>
                <Text style={styles.labelRow}>Đầu vào</Text>
              </View>
              <View style={styles.behindView}>
                <Text style={styles.labelRow}>Số lượng</Text>
              </View>
            </View>
            <>
              {arrSource?.length > 0 &&
                arrSource.map(item => (
                  <View style={styles.containerItem}>
                    <View style={styles.preView}>
                      <Text style={styles.itemText}>{item?.output}</Text>
                    </View>
                    <View style={styles.midView}>
                      <Text style={styles.itemText}>{item?.input}</Text>
                    </View>
                    <View style={styles.behindView}>
                      <Text style={styles.itemText}>
                        {item?.quantity + ' ' + item?.unit}
                      </Text>
                    </View>
                    <View style={styles.endView}>
                      <FontAwesome5
                        name={'trash-alt'}
                        size={17}
                        color="#000"
                        //style={styles.deleteIcon}
                        onPress={() => handleDelete(item?._id)}
                      />
                    </View>
                  </View>
                ))}
            </>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default ListViewRecipe;

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
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    // marginBottom: 10,
  },
  containerItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 35,
  },
  viewLanding: {
    padding: 10,
    width: '100%',
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
  labelRow: {
    fontSize: 16,
    width: '100%',
    fontFamily: 'OpenSans-Bold',
    //  fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  itemText: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  // deleteIcon: {
  //   width: '100%',
  //   height: '100%',
  //   marginTop: '9%',
  //   left: '99.8%',
  //   zIndex: 10,
  // },
  preView: {
    width: '38%',
  },
  midView: {
    width: '38%',
  },
  behindView: {
    width: '18%',
  },
  endView: {
    width:'5%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    height:'100%',
    marginLeft:'2%'
  },
});
