import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { useRecoilState } from 'recoil'
import { userInformation } from '../atom/authtication'

const Home = () => {
    const [user, setUser] = useRecoilState(userInformation)
    console.log('user:==================>', user)
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });