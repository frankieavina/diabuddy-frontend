import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';

function ImageForm() {

  return (
    <ScrollView style={styles.form}>
      <View style={styles.text}>
        <Text style={styles.input}>Choose a Profile Picture</Text>
      </View>
      <ImagePicker />
    </ScrollView>
  );
}

export default ImageForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white'
  },
  text:{
    marginTop: 20,
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.35,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 2,
    textAlign: 'center'
    
  },
});