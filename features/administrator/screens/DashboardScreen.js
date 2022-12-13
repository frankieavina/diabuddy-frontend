import { StyleSheet, Text, View, ScrollView, Pressable, ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDeleteUserMutation, useGetAllUsersQuery, useGetUserQuery, useUpdateUserMutation } from '../../../common/api/adminApi';

import Loading from '../../loading/loadingScreen';
import { Colors } from '../../../utils/constants/colors';
import UsersList from './UsersList';

const DashboardScreen = () => {

  // const { deleteUser, {isLoading: deleteRequestSubmitting }] = useDeleteUserMutation();
  // const { updateUser, {isLoading: updateRequestSubmitting }] = useUpdateUserMutation();
  const { data, isLoading} = useGetAllUsersQuery();
  // const { getUserData, {isLoading: gettingUserRequestSubmitting}] = useGetUserQuery();

  return (
    <View style={{flex:1}}>
      <ImageBackground
        source={require('../../../assets/images/pen.jpg')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      { isLoading ? (
          <Loading />
        ) : (
          <>
            <View>
              <Text style={styles.headerText}>Welcome</Text>
              <Text style={styles.headerText2}> 
                Here are all the users in Diabuddy
              </Text>
            </View>
            {data.result.map((data) =>
              <UsersList data={data}/>
            )}
          </>
        )
      }
      </ImageBackground>
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingBottom: 20
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