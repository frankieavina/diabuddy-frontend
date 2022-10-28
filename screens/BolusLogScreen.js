import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Colors } from '../constants/colors';
import { Card } from '@rneui/themed';
import { Table, Row, Rows } from 'react-native-table-component';
import { Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getDayLog } from '../store/FoodLogSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


const BolusLogScreen = ({selectedDay,onPress}) => {
    
    const header = [ 'time' , 'carbs', 'glucose', 'bolus'];
    const dispatch = useDispatch();

    const [dayLog, setDayLog] = useState('');

    useEffect(() => {
      const getUserId = async () =>{
        await AsyncStorage.getItem('id')
          .then((id) => {
            return dispatch(getDayLog({date: selectedDay.dateString, userId: id}))
          })
          .then((data) => {
            setDayLog(data.payload.result);
          })
      };
      getUserId();
    },[]);

    //to converting array of objects to array of array with values only
    const dataBefore = [...dayLog].map((object) => Object.values(object));
    const data = [...dataBefore].map((data) => [moment(data[4]).format('HH:mm'), data[1], data[3], data[2]])

  return (
    <View style={{flex: 1}}>
          <ImageBackground
        source={require('../assets/images/food.jpg')} 
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <View>
            <Text style={styles.headingContainer}>
                Viewing Log for : {selectedDay.dateString}
            </Text>
        </View>
        <View style={styles.table}>
            <View>
              <Ionicons name='ios-file-tray-full-outline' color={Colors.primary700} size={30} style={{marginLeft:'45.59%', marginBottom:5}}/>
            </View>
            <Table borderStyle={{borderWidth: 1, borderColor: Colors.primary600}}>
                <Row data={header} style={styles.HeadStyle} textStyle={styles.TableText}/>
                <Rows data={data} textStyle={styles.TableText}/>
            </Table>
        </View>
        <View style={styles.button}>
            <Button size='lg' title='Go Back' buttonStyle={{backgroundColor:Colors.primary500}} onPress={onPress}/>
        </View>
        </ImageBackground>
    </View>

  )
}

export default BolusLogScreen

const styles = StyleSheet.create({
    headingContainer:{
        margin: 20,
        fontSize: 20,
        textAlign: 'center',
        color: Colors.icon500
      },
      title:{
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      table:{
        margin: 20,
        padding: 18,
        paddingTop:10,
        backgroundColor: '#ffffff',
      },
      HeadStyle: { 
        height: 50,
        alignContent: "center",
        backgroundColor: Colors.primary800
      },
      TableText: { 
        margin: 10
      },
      button:{
        flex:1,
        marginTop: 40,
        padding:20,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      rootScreen:{
        flex:1
      },
      backgroundImage:{
        opacity: 0.15
      }
})