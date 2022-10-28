import { StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, { useState } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Colors } from '../constants/colors';
import { Button } from '@rneui/themed';
import BolusLogScreen from './BolusLogScreen';
import { Chip } from '@rneui/themed';

const MonthLogScreen = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [view, setView] = useState(false);

  const viewLog = () => {
    setView(!view);
  }
  
  return (
    <View style={styles.container}>
          <ImageBackground
        source={require('./../assets/images/calender.jpg')} 
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      {(!view)
        ?
          <>
            <View>
              <Text style={styles.headingContainer}>
                Select Day to View Log
              </Text>
            </View>
            <View style={styles.calenderContainer}>
              <Calendar
              theme={{
                selectedDayTextColor: Colors.primary600,
                selectedDayBackgroundColor: Colors.icon800,
                todayTextColor: Colors.primary500,
                monthTextColor: Colors.primary500,
                indicatorColor: Colors.primary500,
                arrowColor: Colors.primary700,
              }}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={day => {
                  setSelectedDay(day);
                }}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={day => {
                  console.log('selected day', day);
                }}
              />
            </View>
            { selectedDay.dateString 
              ?
              <View style={styles.yoContainer}>
                <Text style={styles.yo}>Selected Day:</Text>
                <Chip title={selectedDay.dateString} containerStyle={{ marginVertical: 15}} buttonStyle={{backgroundColor:Colors.icon500}} />
              </View>
              :
              <View>
                <Chip title='Please select the day you would like to view' disabled containerStyle={{ marginVertical: 15, marginLeft:20, marginRight:20 }}/>
              </View>
            }

            <View style={styles.button}>
              <Button size='lg' title='View Log' buttonStyle={{backgroundColor:Colors.primary500}} onPress={viewLog}/>
            </View>
          </>
        :
          <BolusLogScreen selectedDay={selectedDay} onPress={viewLog}/>
      }
    </ImageBackground>
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
    marginTop: 20,
    padding:20,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  yo:{
    color: Colors.icon500,
  },
  yoContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  rootScreen:{
    flex:1
  },
  backgroundImage:{
    opacity: 0.15
  }
})