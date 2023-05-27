import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {isAuthenticatedUser, userInformation} from '../atom/authtication';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [user, setUser] = useRecoilState(userInformation);
  const [isAuthenticated, setIsAuthenticated] =useRecoilState(isAuthenticatedUser)
  const navigation = useNavigation();
  const signout = async () => {
    await AsyncStorage.removeItem('user');
    setIsAuthenticated(()=> false)
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>

      <Button onPress={signout}>sign out</Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
