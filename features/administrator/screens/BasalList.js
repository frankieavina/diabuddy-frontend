import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { useGetUserBasalQuery } from '../../../common/api/adminApi';
import { Colors } from '../../../utils/constants/colors';
import { Chip } from '@rneui/themed';
import moment from 'moment';

const BasalList = ({user}) => {
    const userId = user.id;
    const [selectedId, setSelectedId] = useState(null);
    const {data, isLoading} = useGetUserBasalQuery(userId);

    const backgroundColor = userId === selectedId ? Colors.icon800 : 'white';
    const textColor = userId === selectedId ? Colors.icon500 : Colors.icon500;

    console.log('Basal Test Data:', data, isLoading)

    const onPress = () =>{
        setSelectedId(userId);
    }

    return (
      <View>
      { !isLoading && 
          <>
            {data.map((data) =>
                <View style={styles.list}>
                    <Text style={{paddingRight: 10, paddingTop: 10}}>
                        {moment(data.time).format('YYYY-MM-DD HH:mm:ss')}
                    </Text>
                    <Chip status="primary" title={data.numberOfTest} titleStyle={{fontSize: 15}} buttonStyle={{backgroundColor: Colors.primary700, marginTop:5, padding: 0}} />
                    <Chip status="primary" title={data.glucose.toString()} titleStyle={{fontSize: 15}} buttonStyle={{backgroundColor: Colors.primary700, marginTop:5, padding: 0}} />
                </View>
            )}
          </>
      }
      </View>
    )
}

export default BasalList

const styles = StyleSheet.create({
    list:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10
    },
})