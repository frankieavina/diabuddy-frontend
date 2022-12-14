import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Grid, LineChart, XAxis, YAxis, AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Button } from '@rneui/themed';
import { Colors } from '../../../utils/constants/colors';

const UserGraph = ({onPress}) => {
    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30

  return (
    <View style={styles.charContainer}>
        <View style={{ height: 350, padding: 20, flexDirection: 'row' }}>
            <YAxis
                data={data}
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={axesSvg}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <AreaChart
                    style={{ height: 300 }}
                    data={data}
                    contentInset={{ verticalContentInset }}
                    curve={shape.curveNatural}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                >
                <Grid />
                </AreaChart>
                {/* <LineChart
                    style={{ flex: 1 }}
                    data={data}
                    contentInset={verticalContentInset}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                >
                    <Grid/>
                </LineChart> */}
                <XAxis
                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                    data={data}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 10, right: 10 }}
                    svg={axesSvg}
                />
            </View>
        </View>
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
    }
})