import React, {forwardRef} from 'react';
import {TextInput as RNTextInput, View, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { width, height } from '../utils/dimenion';
const CostumTextInput = forwardRef(({icon, error, touched, ...otherProps}, ref) => {
  const validationColor = error ? '#FF5A5F' : '#fff';

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={icon} color="#666" size={25} />
      </View>

      <RNTextInput
        style={[styles.input, {color: error ? 'red' : '#000'}]}
        underlineColorAndroid="transparent"
        placeholderTextColor={error ? 'red' : '#000'}
        ref={ref}
        {...otherProps}
        error={error}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '90%',
    // marginLeft: 20,

    height: height / 15,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  iconStyle: {
    padding: 10,
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    // borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    // fontFamily: Font.primary,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default CostumTextInput;
