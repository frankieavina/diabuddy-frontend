import { Pressable, StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, Alert, ImageBackground} from 'react-native';
import React from '@rneui/themed';
import { Colors } from '../utils/constants/colors';
import { useState, useEffect } from 'react';
import { Button } from '@rneui/themed';
import { Card, Input } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import FoodModal from '../common/components/ui/FoodModal';
import { useDispatch } from 'react-redux';
import { addBolus } from '../app/redux/slices/FoodLogSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddFoodScreen = () => {
  const dispatch = useDispatch();

  const [userId , setUserId] = useState('');
  const [glucose, setGlucose] = useState(0);
  const [carbs, setCarbs] = useState();
  const [bolus, setBolus] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDis, setIsDis] = useState(false);

  useEffect(() => {
    const getUserId = async () =>{
      await AsyncStorage.getItem('id')
        .then((id) => {
          setUserId(id);
        })
    }
    getUserId();
  },[]);


  const onSubmit = () =>{
    dispatch(addBolus({
      date: Date.now(),
      glucose: glucose,
      carbs: carbs,
      bolus: bolus,
      userId
    })); 
    setGlucose(0);
    setCarbs(0);
    setBolus(0);
    setIsDis(false);
    Alert.alert(
      'Bolus Wizard was Added!',
      'Please make sure to comeback and log your next bolus!'
    );
  }

  const toggleCarbsModal = () => {
    setModalVisible(!modalVisible);
  }

  const setCarbsTotal = (total) => {
    setIsDis(true);
    setCarbs(total);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View  style={styles.bolusWizardContainer}>
    <ImageBackground
        source={require('./../assets/images/food.jpg')} 
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      <View style={styles.title}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          Bolus Wizard
        </Text>
      </View>
      <Card style={styles.formContent}>
        <View style={styles.form}>
          <Input
            onChangeText={value => setGlucose(value)} 
            containerStyle={{width: '100%'}} 
            placeholder={'0 mg/dL'}
            label={
              <Ionicons name="water-outline" size={15} color={Colors.primary700}>
                Blood Glucose
              </Ionicons>
            } 
            labelStyle={{color: Colors.primary500, fontSize:12}}
          />
        </View>
      </Card>
      <Card style={styles.formContent}>
        <View style={styles.form}>
          <Input
            disabled={isDis}
            onChangeText={value => setCarbs(value)} 
            containerStyle={{width: '100%'}} 
            placeholder={'0 carbs'}
            value={carbs}
            rightIcon={
              <Pressable onPress={toggleCarbsModal}>
                <Ionicons name="add-circle-outline" size={25} color={Colors.primary700}></Ionicons>
              </Pressable>
            }
            label={
              <Ionicons name="fast-food-outline" size={15} color={Colors.primary700}>
                Carbohydrates
              </Ionicons>
            } 
            labelStyle={{color: Colors.primary500, fontSize:12}}
          >{carbs}</Input>
        </View>
      </Card>
      <Card style={styles.formContent}>
        <View style={styles.form}>
          <Input
            onChangeText={value => setBolus(value)} 
            containerStyle={{width: '100%'}} 
            placeholder={'0 units'}
            label={
              <Ionicons name="arrow-forward-circle-outline" size={15} color={Colors.primary700}>
                Bolus
              </Ionicons>
            } 
            labelStyle={{color: Colors.primary500, fontSize:12}}
          />
        </View>
      </Card>
      <View style={styles.buttons}>
        <Button type="outline" raised buttonStyle={{borderColor:Colors.primary500, borderWidth:1}} titleStyle={{ color: Colors.primary500}} onPress={onSubmit}>
          Save
        </Button> 
        <Button buttonStyle={{backgroundColor:Colors.primary500}} onPress={onSubmit}>
          Cancel
        </Button>  
      </View>   
      {modalVisible && <FoodModal onVisible={toggleCarbsModal} modalVisible={modalVisible} setTotalCarbs={setCarbsTotal}/>}
      </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default AddFoodScreen

const styles = StyleSheet.create({
  bolusWizardContainer:{
    flex: 1
  },
  buttons:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  formContent:{
    padding: 16,
    color: Colors.primary500,
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    marginBottom: 20
  },
  title:{
    margin: 20,
    padding: 20,
  },
  rootScreen:{
    flex:1
  },
  backgroundImage:{
    opacity: 0.15
  }
})