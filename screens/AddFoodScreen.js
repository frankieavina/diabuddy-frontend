import { StyleSheet, Text, View } from 'react-native';
import React from '@rneui/themed';
import { Colors } from '../constants/colors';
import Input from '../components/Auth/input';
import { useState } from 'react';
import { Button } from '@rneui/themed';

const AddFoodScreen = () => {

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const updateInputValueHandler= (inputType, enteredValue) => {
    switch (inputType) {
      case 'name':
        setEnteredName(enteredValue);
        break;
      case 'date':
        setEnteredEmail(enteredValue);
        break;
      case 'time':
        setEnteredConfirmEmail(enteredValue);
        break;
    }
  }

  const onSubmit = () =>{
    console.log("set reminder:", name, date, time);
  }

  return (
    <View style={styles.formContent}>
      <View style={styles.form}>
        <Input
            label="Name"
            onUpdateValue={updateInputValueHandler.bind(this, 'name')}
            value={name}
            keyboardType="email-address"
          />
          <Input
            label="Date"
            onUpdateValue={updateInputValueHandler.bind(this, 'date')}
            value={date}
            keyboardType="email-address"
          />
          <Input
            label="Time"
            onUpdateValue={updateInputValueHandler.bind(this, 'time')}
            value={time}
            keyboardType="email-address"
          />
        <View style={styles.buttons}>
          <Button buttonStyle={{backgroundColor:Colors.primary500}} onPress={onSubmit}>
            Save
          </Button>      
        </View>
      </View>
    </View>
  )
}

export default AddFoodScreen

const styles = StyleSheet.create({
  formContent:{
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons:{
    marginTop: 8,
  }
})