import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const MonthLogScreen = () => {
  
  return (
    <View>
      <Calendar
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
  )
}

export default MonthLogScreen

const styles = StyleSheet.create({})