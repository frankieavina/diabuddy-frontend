import { ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { Card } from '@rneui/themed'
import DashboardCard from '../common/components/ui/DashboardCard';
import { useSelector } from 'react-redux';
import { Colors } from '../utils/constants/colors';

const DashboardScreen = () => {
  const user = useSelector((state) => state.UserData.value);

  return (
    <>
      <ScrollView>
      <ImageBackground
        source={require('./../assets/images/food.jpg')} 
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <View>
          <Text style={styles.headerText}>Hi {user.name}!</Text>
          <Text style={styles.headerText2}>Here are you daily reports</Text>
        </View>
        <View style={styles.container}>
          <DashboardCard style={styles.innerContainer} header={'Bolus Due'} data={' 1:00 pm'} iconPic={'today-outline'}/>
          <DashboardCard style={styles.innerContainer}  header={'Bolus Taken'} data={'8:00 am'} iconPic={'bandage-outline'}/>
          <DashboardCard style={styles.innerContainer}  header={'Glucose'} data={'Average: 153 mg/dL'} iconPic={'trending-up-outline'}/>
          <DashboardCard style={styles.innerContainer}  header={'Carbohydrates'} data={'Total: 200 carbs'} iconPic={'restaurant-outline'}/>
          <DashboardCard style={styles.innerContainer}  header={'Steps'} data={'1200 steps'} iconPic={'walk-outline'}/>
          <DashboardCard style={styles.innerContainer}  header={'Pulse'} data={'96 bpm'} iconPic={'fitness-outline'}/>
        </View>
      </ImageBackground>
      </ScrollView>
      
    </>
    
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingBottom: 20
  },
  innerContainer:{
    width: '50%'
  },
  headerText:{
    fontSize: 25,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 55,
    padding: 10,
    textAlign: 'start',
    textColor: Colors.primary500
  },
  headerText2:{
    fontSize: 17,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    textAlign: 'start',
    textColor: Colors.primary800
  },
  rootScreen:{
    flex:1
  },
  backgroundImage:{
    opacity: 0.15
  }
})