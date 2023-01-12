import { StyleSheet, Text, View, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react';
import { Colors } from '../../../utils/constants/colors';
import SelectBox from 'react-native-multi-selectbox';
import { Ionicons } from '@expo/vector-icons';
import { Card, Input } from "@rneui/themed";
import { Button } from '@rneui/themed';
import moment from 'moment';

import UserGraph from '../../administrator/features/UserGraph'

import {useGetAllUsersQuery} from '../../../common/api/adminApi';


const PatientBolus = () => {
  const { data, isLoading} = useGetAllUsersQuery();
  const [user, setUser] = useState('');
  const [date, setDate] = useState('');
  const [showList, setShowList] = useState(false); //change to false

  const onSubmit = () =>{
    let dateValid = moment(date,'YYYY-MM-DD', true).isValid();
    
    if(dateValid){
      setShowList(!showList);
    }
    else{
      Alert.alert('Invalid input', 'Please check the date input format. Should be YYYY-MM-DD.');
    }
  }

  function onChange(){
    return (val) =>setUser(val)
  }

  return (
    <View style={{flex:1}}>
      <ImageBackground
        source={require('../../../assets/images/meterfood.jpg')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      <View>
        <Text style={styles.titleText}>Bolus Patient's History</Text>
      </View>
      { (!isLoading && !showList) && (
          <>
            <Text style={styles.infoText}> 
              Please select specific patient and date to view data
            </Text>
            <View style={styles.pickerContainer}>

              <Card style={styles.formContent}>
                <SelectBox
                  label="Select single"
                  options={data.result.map(({ name, id }) => {
                    return {item:name,id:+id};
                  })}
                  value={user}
                  onChange={onChange()}
                  hideInputFilter={false}
                  arrowIconColor={Colors.primary500}
                  width={'100%'}
                />
              </Card>

              <Card style={styles.formContent}>
                  <Input
                    onChangeText={value => setDate(value)} 
                    containerStyle={{width: '100%', paddingBottom: 0}} 
                    placeholder={'YYYY-MM-DD'}
                    label={
                      <Ionicons name="water-outline" size={15} color={Colors.primary700}>
                        Select Date:
                      </Ionicons>
                    } 
                    labelStyle={{color: Colors.primary500, fontSize:12}}
                  />
              </Card>

              <Button buttonStyle={{backgroundColor:Colors.primary500, width:'50%', margin:20}} onPress={onSubmit}>
                View
              </Button> 

            </View>
          </>
        )
      }
      { showList &&
        <View>
          <Text style={styles.infoText}> 
            Showing glucose graph info for {user.item}
          </Text>
          <UserGraph user={user} date={date} onPress={onSubmit}/> 
        </View>
       
      }
      </ImageBackground>
    </View>
  )
}

export default PatientBolus

const styles = StyleSheet.create({
  rootScreen:{
    flex:1
  },
  formContent:{
    color: Colors.primary500,
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    marginBottom: 20
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
    fontSize: 17,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    textAlign: 'start',
    textColor: Colors.primary800
  },
  pickerContainer:{
    margin: 20,
    marginTop: 20,
    flexDirection: 'column'
  },
  backgroundImage:{
    opacity: 0.15,
    width:500
  }
})