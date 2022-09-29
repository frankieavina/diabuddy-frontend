import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants/colors';
import Input from '../components/Auth/input';
import { useState } from 'react';
import { Button } from '@rneui/themed';
import DatePicker from 'react-native-date-picker';

const BasalTestingScreen = () => {
  const [name, setName] = useState('Frankie');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState();

  const updateInputValueHandler= (inputType, enteredValue) => {
    switch (inputType) {
      case 'name':
        setName(enteredValue);
        break;
      case 'date-time':
        setDateTime(enteredValue);
        break;
    }
  }

  const onSubmit = () =>{
    console.log("set reminder:", name, date );
  }

  return (
  <>
    <View>
      <Text style={styles.titleText}> Basal Testing </Text>
      <Text style={styles.infoText}> 
        Please fill out the corresponding form as you go. If you have 
        any trouble or questions please contact your doctor.
      </Text>
    </View>
    <View style={styles.formContent}>
      <View style={styles.form}>
        <Input
            label="Name"
            onUpdateValue={updateInputValueHandler.bind(this, 'name')}
            value={name}
            keyboardType="email-address"
        />
        <View>
        <Input
            label="Date and Time"
            onUpdateValue={updateInputValueHandler.bind(this, 'date-time')}
            value={dateTime}
            keyboardType="email-address"
        />
          <Button buttonStyle={{backgroundColor:Colors.primary500}} onPress={()=> setOpen(true)} textColor={Colors.primary700}>
            Pick Datetime
          </Button> 
          <DatePicker 
            modal 
            open={open} 
            date={date}  
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={()=>{setOpen(false)}}
          />
        </View>
        <View style={styles.buttons}>
          <Button buttonStyle={{backgroundColor:Colors.primary500}} onPress={onSubmit} textColor={Colors.primary700}>
            Save
          </Button>      
        </View>
      </View>
    </View>
  </>
  )
}

export default BasalTestingScreen

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
  },
  titleText:{
    fontSize: 25,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 55,
    padding: 10,
    textAlign: 'start',
    textColor: Colors.primary500
  },
  infoText:{
    fontSize: 15,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    textAlign: 'start',
    textColor: Colors.primary800
  }
})