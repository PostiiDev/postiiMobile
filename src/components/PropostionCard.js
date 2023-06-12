import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import { height } from '../utils/dimenion'

const PropostionCard = ({item}) => {
  return (
    <Card style={styles.cardContainer}>
      <Text>khadija make a propostion </Text>
      <Text>price : </Text>
      <Text>message : </Text>

    </Card>
  )
}

export default PropostionCard

const styles = StyleSheet.create({
    cardContainer : {
        height:height / 3
    }
})