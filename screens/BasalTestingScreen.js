import { Pressable, StyleSheet, Text, View, Alert, Keyboard, ImageBackground} from 'react-native';
import React, { useEffect } from 'react';
import SelectBox from 'react-native-multi-selectbox';
import { Colors } from '../utils/constants/colors';
import { Input } from "@rneui/themed";
import { useState } from 'react';
import { Button } from '@rneui/themed';
import { Card } from '@rneui/themed';
import { Divider } from "@rneui/themed";
import BasalList from '../common/components/ui/BasalList';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addBasalTest, getBasalTest } from '../app/redux/slices/BasalTestingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

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
  const [show, setShow] = useState(false);
  const [basalTime, setBasalTime] = useState({});
  const [glucose, setGlucose] = useState('');

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

  const onSave = async () =>{
    if(glucose.length > 0 || basalTime.length > 0){
      onReset();
      await dispatch(addBasalTest({numTest: basalTime.item, glucose, date: Date.now(), userId}));
      await dispatch(getBasalTest(userId)); 
      Keyboard.dismiss();
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

  const toggleShowAlarm = () =>{
    setShow(!show);
  }

  return (
  <View style={{ flex: 1 }}>
          <ImageBackground
        source={require('./../assets/images/log.jpg')} 
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
    <View>
      <Text style={styles.titleText}> Basal Rate Test</Text>
      <Text style={styles.infoText}> 
        Please fill out the corresponding form as you go. If you have 
        any trouble or questions please contact your doctor.
      </Text>
    </View>
    {show
      ?
        <View style={styles.card}>
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
            <Button type="outline" raised buttonStyle={{borderColor:Colors.primary500}} titleStyle={{ color: Colors.primary500}} onPress={toggleShowAlarm}>
              Cancel
            </Button> 
            <Button buttonStyle={{backgroundColor:Colors.primary500}} onPress={onSave}>
              Save
            </Button> 
            <Button type="outline" raised buttonStyle={{borderColor:Colors.primary500}} titleStyle={{ color: Colors.primary500}} onPress={onReset}>
              Reset
            </Button> 
          </View>
        </Card>
        
        </View>
      :
        <View style={styles.buttonsContainer2}>
          <Text style={{fontSize: 25, color:Colors.icon500}}>Add Basal Test</Text>
          <Pressable onPress={toggleShowAlarm}>
            <Ionicons name="add-circle-outline" size={30} color={Colors.primary700} />
          </Pressable>
        </View>
    }

    {/* <Divider style={{margin:20}}/> */}
    <BasalList basalTests={basalTests} userId={userId}/>
    </ImageBackground>
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
  },
  buttonsContainer2:{
    margin: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  card:{
    margin: 20
  },
  rootScreen:{
    flex:1
  },
  backgroundImage:{
    opacity: 0.15
  }
})