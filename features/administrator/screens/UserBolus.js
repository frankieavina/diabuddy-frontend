import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Colors } from '../../../utils/constants/colors';
import SelectBox from 'react-native-multi-selectbox';
import {useGetAllUsersQuery, useGetUserQuery} from '../../../common/api/adminApi';

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

const UserBolus = () => {
  const { data, isLoading} = useGetAllUsersQuery();
  const [user , setUser] = useState('');
  const [userList, setUserList] = useState('');

  function onChange(){
    (val) => {
      
    };
    return (val) => setUser(val)
  }

  return (
    <View style={{flex:1}}>
      <ImageBackground
        source={require('../../../assets/images/food.jpg')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      <View>
        <Text style={styles.titleText}>Bolus User History</Text>
        <Text style={styles.infoText}> 
          Please select specific user to view data
        </Text>
      </View>
      { (isLoading) ? (
          <Loading />
        ) : (
          <>
            <View style={styles.pickerContainer}>
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
            </View>
          </>
        )
      }
      </ImageBackground>
    </View>
  )
}

export default UserBolus

const styles = StyleSheet.create({
  rootScreen:{
    flex:1
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
    marginTop: 40,
    flexDirection: 'row'
  },
  backgroundImage:{
    opacity: 0.15
  }
})