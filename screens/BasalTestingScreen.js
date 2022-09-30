import { ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectBox from 'react-native-multi-selectbox';
import { Colors } from '../constants/colors';
import { Input } from "@rneui/themed";
import { useState } from 'react';
import { Button } from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import { Card } from '@rneui/themed';
import BasalTestCard from '../components/ui/BasalTestCard';
import { Divider } from "@rneui/themed";

const K_OPTIONS = [
  {
    item: 'Start',
    id: 1,
  },
  {
    item: '+1 hour',
    id: 2,
  },
  {
    item: '+2 hour(s)',
    id: 3,
  },
  {
    item: '+3 hour(s)',
    id: 4,
  },
  {
    item: '+4 hour(s)',
    id: 5,
  },
  {
    item: 'End',
    id: 6,
  }
]

const BasalTestingScreen = () => {
  const input = React.createRef();
  const [date, setDate] = useState(new Date());
  const [basalTime, setBasalTime] = useState({});
  const [glucose, setGlucose] = useState('');

  const onSave = () =>{
    console.log("Time and glucose",basalTime,glucose)
  }

  const onReset = () =>{
    setBasalTime({});
    input.current.clear(); 
  }

  function onChange() {
    return (val) => setBasalTime(val)
  }

  return (
  <ScrollView>
    <View>
      <Text style={styles.titleText}> Basal Rate Test</Text>
      <Text style={styles.infoText}> 
        Please fill out the corresponding form as you go. If you have 
        any trouble or questions please contact your doctor.
      </Text>
    </View>
    <View style={styles.pickerContainer}>
      <SelectBox
        label="Select single"
        options={K_OPTIONS}
        value={basalTime}
        onChange={onChange()}
        hideInputFilter={false}
        arrowIconColor={Colors.primary500}
        width={'50%'}
      />
      <Input onChangeText={value => setGlucose(value)} containerStyle={{width: '50%'}} label={'Enter Glucose'} labelStyle={{color: 'gray', fontSize:12}}/>
    </View>
    <View style={styles.buttonsContainer}>
      <Button buttonStyle={{backgroundColor:Colors.primary500}} onPress={onSave}>
        Save
      </Button> 
      <Button type="outline" raised buttonStyle={{borderColor:Colors.primary500}} titleStyle={{ color: Colors.primary500}} onPress={onReset}>
        Reset
      </Button> 
    </View>
    <Divider style={{margin:20}}/>
    <View style={styles.container}>
      <Card>
        <Card.Title>Basal Rate Results: 11/12/2022</Card.Title>
        <Card.Divider />
        <BasalTestCard/>
      </Card>
    </View>
  </ScrollView>
  )
}

export default BasalTestingScreen

const styles = StyleSheet.create({
  pickerContainer:{
    margin: 20,
    marginTop: 40,
    flexDirection: 'row'
  },
  buttonsContainer:{
    marginBottom: 20,
    marginLeft: 20,
    marginRight:20,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  titleText:{
    fontSize: 25,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
    textColor: Colors.primary500
  },
  infoText:{
    fontSize: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    textAlign: 'center',
    textColor: Colors.primary800
  },
  inputContainer:{
    margin: 20,
  }
})