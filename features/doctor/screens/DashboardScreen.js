import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, {useState} from 'react'

import { useGetAllUsersQuery } from '../../../common/api/adminApi';

import Loading from '../../loading/loadingScreen';
import { Colors } from '../../../utils/constants/colors';
import PatientList from './PatientList';
import Messaging from './Messaging';

const DashboardScreen = () => {
  const [pickMes, setPickMes] = useState(false)

  // const { deleteUser, {isLoading: deleteRequestSubmitting }] = useDeleteUserMutation();
  // const { updateUser, {isLoading: updateRequestSubmitting }] = useUpdateUserMutation();
  const { data, isLoading} = useGetAllUsersQuery();
  // const { getUserData, {isLoading: gettingUserRequestSubmitting}] = useGetUserQuery();

  const onMessage = () =>{
    setPickMes(!pickMes);
  }


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
          { (!pickMes)
            ?
              <>            
              <View>
                <Text style={styles.headerText}>Welcome</Text>
                {/* <Text style={styles.headerText2}> 
                  Dashboard
                </Text> */}
              </View>
              {data.result.map((data) =>
                <PatientList data={data} onMessage={onMessage}/>
              )}
            </>
          :
            <Messaging goBack={onMessage} />
          }
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