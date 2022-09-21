import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';

const LandingScreen = () => {
  const navigation = useNavigation();

  const signInHandler = () => {
    navigation.navigate('Login');
  }
  
  const signUpHandler = () => {
    navigation.navigate('Signup');
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.logoContainer}>
        <View><Ionicons name='logo-tux' size={50} color='black'/></View>
        <View>
          <Text style={styles.logoText}>
            DiaBuddy
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.titleText}>Hello! </Text>
        <Text style={styles.textContainer}>Welcome to DiaBuddy your gateway to controlling your diabetes!</Text>        
      </View>
      <View style={styles.buttonsContainer}>
        <Button size='lg' title='Sign In' buttonStyle={{backgroundColor:Colors.primary500}} onPress={signInHandler}/>
        <Button size='lg' title='Sign Up' buttonStyle={{backgroundColor:Colors.primary500}} onPress={signUpHandler}/>
      </View>
    </View>
  )
}

export default LandingScreen

const styles = StyleSheet.create({
  rootContainer:{
    flex: 1,
    marginBottom: 32,
    justifyContent: 'flex-start'
  },
  logoContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60
  },
  logoText:{
    fontSize: 35,
  },
  titleText:{
    fontSize: 23,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 75,
    padding: 10,
    textAlign: 'start',
    textColor: 'blue'
  },
  textContainer:{
    fontSize: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom:20,
    padding: 10,
    textAlign: 'start',
    textColor: 'blue'
  },
  buttonsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop:75
  },
})