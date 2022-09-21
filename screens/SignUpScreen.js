import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { userRegister } from '../store/UserSlice';

const SignUpScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  const signUpHandler = ({email, password, name}) => {
    setIsAuthenticating(true);
    try{ 
      dispatch(userRegister({email, password, name}))
    } catch (err) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
    }
    setIsAuthenticating(false);
  }

  return (
    <>
      {(!isAuthenticating)
        ? 
          <AuthContent onAuthenticate={signUpHandler} />
        :
          <LoadingOverlay message="Creating user..." />
      } 
    </>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({})