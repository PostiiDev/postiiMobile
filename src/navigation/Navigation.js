import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Register} from '../screens/Register';
import {Login} from '../screens/Login';
import {useRecoilState} from 'recoil';
import {isAuthenticatedUser, userInformation} from '../atom/authtication';
import Home from '../screens/Home';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedUser);
    const [user, setUser] = useRecoilState(userInformation)
  useEffect(() => {
    checkIfIsAuthenticated();
  });
  const checkIfIsAuthenticated = async () => {
    //await AsyncStorage.removeItem('user')
    try {

      const check = await AsyncStorage.getItem('user')
      const value = JSON.parse(check)
    
      if (user !== null) {
        setIsAuthenticated(true)
        setUser(value)
        
      }
    } catch (e) {}
  };
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
};

export default Navigation;
