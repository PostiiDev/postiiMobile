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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../utils/Color';
import OffreStack from './OffreStack';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedUser);
  const [user, setUser] = useRecoilState(userInformation);
  useEffect(() => {
    checkIfIsAuthenticated();
  });
  const checkIfIsAuthenticated = async () => {
    try {
      const check = await AsyncStorage.getItem('user');
      const value = JSON.parse(check);

      if (value !== null) {
        setIsAuthenticated(true);
        setUser(()=> value);
      }
    } catch (e) {}
  };
  {
    /* <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator> */
  }
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator
          initialRouteName="Offre"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'md-home-outline' : 'md-home-outline';
              } else if (route.name === 'Offre') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: Color.primary,
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Offre"
            component={OffreStack}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
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
