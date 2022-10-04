import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Colors } from '../constants/colors';
import { Button } from '@rneui/themed';

const MonthLogScreen = () => {
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headingContainer}>
          Select Day to View Log
        </Text>
      </View>
      <View style={styles.calenderContainer}>
        <Calendar
        theme={{
          selectedDayTextColor: Colors.accent800,
          selectedDayBackgroundColor: Colors.primary500,
          todayTextColor: Colors.primary500,
          monthTextColor: Colors.primary500,
          indicatorColor: Colors.primary500,
          arrowColor: Colors.primary700,
        }}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            console.log('selected day', day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={day => {
            console.log('selected day', day);
          }}
        />
      </View>
      <View style={styles.button}>
        <Button size='lg' title='View Log' buttonStyle={{backgroundColor:Colors.primary500}} />
        <Button size='lg' title='Cancel' type="outline" buttonStyle={{borderColor:Colors.primary500}} titleStyle={{ color: Colors.primary500}}/>
      </View>
    </View>

  )
}

export default MonthLogScreen

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  calenderContainer:{
    margin: 20,
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  headingContainer:{
    margin: 20,
    fontSize: 20,
    textAlign: 'center',
    color: Colors.icon500
  },
  button:{
    flex:1,
    marginTop: 40,
    padding:20,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})