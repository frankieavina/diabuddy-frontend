import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { userLogIn } from '../store/UserSlice';

const SignInScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const dispatch = useDispatch();

  const loginHandler = ({email, password}) => {
    setIsAuthenticating(true);
    try{
      dispatch(userLogIn({email, password}));
    } catch (err) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
    }
    setIsAuthenticating(false);
  }

  return (
    <>
      {(!isAuthenticating)
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