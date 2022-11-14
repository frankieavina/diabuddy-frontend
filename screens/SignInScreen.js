import { StyleSheet, Text, View, Alert } from 'react-native';
import React, {useState} from 'react';
import { useUserLogInMutation } from '../common/api/userApi';
import AuthContent from '../common/components/Auth/AuthContent';
import LoadingOverlay from '../common/components/ui/LoadingOverlay';

const SignInScreen = () => {
  // the mutation trigger and destructured mutation result
  const [userLogIn , {isLoading: loginRequestSubmitting}] = useUserLogInMutation();

  const loginHandler = async ({email, password}) => {
    //sanitizing the values received
    const payload = {
      email,
      password
    };

    try{
      if(!loginRequestSubmitting){
        //calling user login and getting response back storing in res 
        const res = await userLogIn({email, password}).unwrap();
        console.log("RESPONSE:",res)
      }
    } catch (err) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
    }
  }

  return (
    <>
      {(!loginRequestSubmitting)
        ? 
          <AuthContent isLogin onAuthenticateLog={loginHandler} />
        :
          <LoadingOverlay message="Logging you in..." />
      } 
    </>
  )
}

export default SignInScreen

const styles = StyleSheet.create({})