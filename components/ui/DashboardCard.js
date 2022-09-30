import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Badge } from "@rneui/themed";
import { Colors } from '../../constants/colors';

const DashboardCard = ({header, data, iconPic}) => {
  return (
    <Card>
        <Card.Title>
            <Ionicons name={iconPic}/>{header}
        </Card.Title>
        <Card.Divider />
        <View >
          <Badge value={data} status="primary" badgeStyle={{backgroundColor: Colors.primary700}} />
        </View>
    </Card>
  )
}

export default DashboardCard

const styles = StyleSheet.create({})