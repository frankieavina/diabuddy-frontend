import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Input from '../components/Auth/input';
import { Colors } from '../constants/colors';

const ReminderScreen = () => {
  return (
    <View style={styles.formContent}>
      <View style={styles.form}>
      <Input
          label="Food"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
      </View>
      <View style={styles.buttons}>
        <Button buttonStyle={{backgroundColor:Colors.primary800}} onPress={switchAuthModeHandler}>
          Save
        </Button>    
      </View>
      <View style={styles.buttons}>
        <Button buttonStyle={{backgroundColor:Colors.primary800}} onPress={switchAuthModeHandler}>
          Submit
        </Button>   
      </View>
    </View>
  )
}

export default ReminderScreen

const styles = StyleSheet.create({
  formContent:{
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons:{
    marginTop: 8,
  }
})