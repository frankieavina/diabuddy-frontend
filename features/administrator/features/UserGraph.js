import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Grid, LineChart, XAxis, YAxis, AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Button, Card } from '@rneui/themed';
import { Colors } from '../../../utils/constants/colors';
import { useGetUserGlucoseDataQuery } from '../../../common/api/nightScoutApi';
import moment from 'moment';

const UserGraph = ({onPress, date, user}) => {

    const [ dateData, setDateData ] = useState([]);

    const { item , id} = user;

    const {data, isLoading} = useGetUserGlucoseDataQuery({
        date1: moment(date).format("YYYY-MM-DD"),
        date2: moment(date).add(1, 'days').format('YYYY-MM-DD')
    });

    useEffect(()=>{
        if(data){
            data.map((data)=>{
                const date1 = moment(date).format('YYYY-MM-DD');
                const date2 = moment(data.date).format('YYYY-MM-DD');
                const boolDate = moment(date1).isSame(date2);
                if(boolDate){
                    setDateData((prevState)=>[...prevState, data.svg]);
                }
            })
        }
    },[data])


    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 30;

  return (
    <View style={styles.charContainer}>
        { (dateData.length > 0)
        ?
            <View style={{ height: 350, padding: 20, flexDirection: 'row' }}>
                {/* <View style={{ flex: 1, marginLeft: 10 }}> */}
                    <YAxis
                        data={dateData}
                        contentInset={{top: 20, bottom: 20}}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        numberOfTicks={20}
                        formatLabel={(value) => `${value} mg/dL`}
                    />
                    <LineChart
                        style={{ flex: 1 }}
                        data={dateData}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        yMin={70}
                        yMax={300}
                    >
                        <Grid/>
                    </LineChart>
                {/* </View> */}
            </View> 
        :
            <View>
                <Card containerStyle={{ marginTop: 15 }}>
                    <Card.Title>No Data</Card.Title>
                    <Card.Divider />
                    <Text style={styles.fonts} h3>
                        No data found for this date. Please go back and select a different date.
                    </Text>
                </Card>
            </View>
        }
        <Button buttonStyle={{backgroundColor:Colors.primary500, width:'50%', margin:20}} onPress={onPress}>
                Go Back
        </Button>  
    </View>
  )
}

export default UserGraph

const styles = StyleSheet.create({
    charContainer:{
        margin: 20,
        justifyContent:'center',
    },
    fonts:{
        marginBottom: 8,
    }
})