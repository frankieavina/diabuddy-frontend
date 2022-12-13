import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, {useState} from 'react'
import { Colors } from '../../../utils/constants/colors';
import SelectBox from 'react-native-multi-selectbox';
import {useGetAllUsersQuery} from '../../../common/api/adminApi';
import { Button } from '@rneui/themed';
import BasalList from './BasalList';

const UsersBasal = () => {
  const { data, isLoading} = useGetAllUsersQuery();
  const [user , setUser] = useState('');
  const [showList, setShowList] = useState(false);

  function onChange(){
    return (val) =>setUser(val)
  }

  const onSubmit = () =>{
    setShowList(true);
  }

  return (
    <View style={{flex:1}}>
      <ImageBackground
        source={require('../../../assets/images/glucosemeter.jpg')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      <View>
        <Text style={styles.titleText}>Basal Test User History</Text>
        <Text style={styles.infoText}> 
          Please select specific user to view user's data
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
                width={'75%'}
              />
              <Button buttonStyle={{backgroundColor:Colors.primary500, width:'50%', marginBottom: 20, marginTop: 20}} onPress={onSubmit}>
                View
              </Button> 
              {showList && 
                <BasalList user={user}/>
              }
              
            </View>
          </>
        )
      }
      </ImageBackground>
    </View>
  )
}

export default UsersBasal

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
    marginLeft: 40,
    marginBottom: 40,
    flexDirection: 'column'
  },
  backgroundImage:{
    opacity: 0.15,
    width: 500
  }
})