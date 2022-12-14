import { StyleSheet, Text, View, Alert } from 'react-native';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useUserLogInMutation } from '../common/api/userApi';
import AuthContent from '../common/components/Auth/AuthContent';
import LoadingOverlay from '../common/components/ui/LoadingOverlay';
import { userLogIn } from '../app/redux/slices/UserSlice';

const SignInScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const dispatch = useDispatch();

  ////////////////// thunk ///////////////////
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
  /////////////////////////////////////

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