import { Pressable, View, StyleSheet, Text, TouchableOpacity, TextInput, ImageBackground, Alert} from "react-native";
import React, {useEffect, useState} from 'react';
import { Colors } from '../../../utils/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from "@rneui/themed";

import * as SMS from 'expo-sms';


const Messaging = ({ goBack}) => {
    const [input, setInput] = useState(`Patient`);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [input2, setInput2] = useState('');
    const [buttonDisabled2, setButtonDisabled2] = useState(true);
    const [input3, setInput3] = useState('');
    const [buttonDisabled3, setButtonDisabled3] = useState(true);
    //const [message, setMessage] = useState('');

    const [smsServiceAvailable, setSmsServiceAvailable] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        checkIfServiceAvailable();
    }, []);

    const checkIfServiceAvailable = async () => {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
          setSmsServiceAvailable(true);
        }
    };

    useEffect(() => {
        if(!smsServiceAvailable){
          Alert.alert(
            'SMS failed!',
            'No SMS service available. Please try again later!'
          ); 
        }
    },[smsServiceAvailable])

    const handleNotificationChange = (text) => {
        setInput(text);
        setButtonDisabled(text.length === 0);
    }

    const handlePhoneChange = (number) => {
        setInput2(number);
        setButtonDisabled2(number.length !== 10);
    }

    const handleEmailChange = (email) => {
        setInput3(email);
        setButtonDisabled3(email.length === 0);
    }

    const onComposeSms = async () => {
        if (smsServiceAvailable && input2 && message) {
          await SMS.sendSMSAsync(phoneNumber.toString(), message);
        }
      };

  return (
    <View style={{flex:1}}>
      <ImageBackground
        source={require('../../../assets/images/glucosemeter.jpg')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      <View>
        <Pressable onPress={goBack}>
          <Ionicons style={{marginTop: 20, marginLeft: 20}} name="arrow-back-circle-outline" size={24} color="black" />
        </Pressable>
      </View>
      <View>
        <Text style={styles.titleText}>Message Patient</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
            containerStyle={{width: '50%'}} 
            label={'Enter Name'}
            labelStyle={{color: 'gray', fontSize:12}}
            onChangeText={handleNotificationChange}
            value={input}
        />
        <Input
            containerStyle={{width: '50%'}} 
            label={'Enter Email'} 
            labelStyle={{color: 'gray', fontSize:12}}
            onChangeText={handleEmailChange}
            value={input3}
            keyboardType={"email-address"}
            placeholder={'name@gmail.com'}
        />
        <Input
            containerStyle={{width: '50%'}} 
            label={'Enter Phone Number'} 
            labelStyle={{color: 'gray', fontSize:12}}
            onChangeText={handlePhoneChange}
            value={input2}
            keyboardType={"phone-pad"}
            placeholder={'2091234567'}
        />
      </View>

      <View style={styles.inputMessageContainer}>
        <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            keyboardType='default'
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}
            placeholder="Enter Message"
        />        
      </View>

      <View style={styles.buttonsContainer}>
        <Button
            buttonStyle={{backgroundColor:Colors.primary500, width:'70%'}}
            title="Send Email"
            disabled={buttonDisabled3}
            onPress={() => console.log('Submitting email')}
        />
        <Button
            buttonStyle={{backgroundColor:Colors.primary500, width:'70%'}}
            title="Send Text"
            disabled={buttonDisabled2}
            onPress={onComposeSms}
        />
        <Button
            buttonStyle={{backgroundColor:Colors.primary500, width:'70%', margin: 10}}
            title="Send Notification"
            disabled={!buttonDisabled}
            onPress={() => console.log('Submitting Noti')}
        />
      </View>
    </ImageBackground>  
    </View>
  )
}

export default Messaging

const styles = StyleSheet.create({
    buttonsContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginLeft: 40
    },
    input:{
        paddingVertical: 8,
        paddingHorizontal: 6,
        backgroundColor: 'white',
        borderRadius: 4,
        fontSize: 16,
    },
    inputContainer:{
        margin:20,
        marginBottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    inputMessageContainer:{
        margin: 20,
        marginBottom: 0,
    },
    titleText:{
        fontSize: 25,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
        padding: 10,
        textAlign: 'start',
        textColor: Colors.primary500
    },
    textInput:{
        borderWidth: 1,
        width:'100%', 
        marginBottom: 20,
        padding: 5,
        height:200, 
        textAlignVertical: 'top'
    },
    backgroundImage:{
        opacity: 0.15,
        width: 500
    },
        rootScreen:{
        flex:1
    },
})