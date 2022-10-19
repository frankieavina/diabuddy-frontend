import { ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import React, { useEffect } from 'react';
import SelectBox from 'react-native-multi-selectbox';
import { Colors } from '../constants/colors';
import { Input } from "@rneui/themed";
import { useState } from 'react';
import { Button } from '@rneui/themed';
import { Card } from '@rneui/themed';
import { Divider } from "@rneui/themed";
import BasalList from '../components/ui/BasalList';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addBasalTest, deleteBasalTest, getBasalTest } from '../store/BasalTestingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const dispatch = useDispatch();
  const basalTests = useSelector(
    (state) => state.basal.value,
    shallowEqual
  );

  const [userId , setUserId] = useState('');

  useEffect(() => {
    const getUserId = async () =>{
      await AsyncStorage.getItem('id')
        .then((id) => {
          setUserId(id);
          dispatch(getBasalTest(id));
        })
    }
    getUserId();
  },[]);

  const [basalTime, setBasalTime] = useState({});
  const [glucose, setGlucose] = useState('');

  const onSave = async () =>{
    console.log('HIII:', glucose, basalTime)
    if(glucose.length > 0 || basalTime.length > 0){
      onReset();
      await dispatch(addBasalTest({numTest: basalTime.item, glucose, date: Date.now(), userId}));
      await dispatch(getBasalTest(userId)); 
    }else{
      return Alert.alert(
        'Submission failed!',
        'Please check your inputs or try again later!'
      );
    }

  }

  const onReset = () =>{
    setBasalTime({});
    setGlucose('');
  }

  function onChange() {
    return (val) => setBasalTime(val)
  }

  return (
  <View style={{ flex: 1 }}>
    <View>
      <Text style={styles.titleText}> Basal Rate Test</Text>
      <Text style={styles.infoText}> 
        Please fill out the corresponding form as you go. If you have 
        any trouble or questions please contact your doctor.
      </Text>
    </View>
    <Card>
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
        <Input onChangeText={value => setGlucose(value)} containerStyle={{width: '50%'}} label={'Enter Glucose'} labelStyle={{color: 'gray', fontSize:12}}>
          {glucose}
        </Input>
      </View>
      <View style={styles.buttonsContainer}>
        <Button buttonStyle={{backgroundColor:Colors.primary500}} onPress={onSave}>
          Save
        </Button> 
        <Button type="outline" raised buttonStyle={{borderColor:Colors.primary500}} titleStyle={{ color: Colors.primary500}} onPress={onReset}>
          Reset
        </Button> 
      </View>
    </Card>
    <Divider style={{margin:20}}/>
    <BasalList basalTests={basalTests} />
  </View>
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