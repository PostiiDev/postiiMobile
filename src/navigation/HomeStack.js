import React from 'react';
import {View, Text, Pressable, TouchableOpacity, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OffreDetail from '../screens/OffreDetail';
import Home from '../screens/Home';
import Proposition from '../screens/Proposition';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Color} from '../utils/Color';
import {useRecoilState} from 'recoil';
import {isAuthenticatedUser} from '../atom/authtication';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedUser);
  const logout = async () => {
    setIsAuthenticated(!isAuthenticated);
    await AsyncStorage.clear();
  };
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={Home}
        options={{
          headerShown: true,
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => logout()}>
              <Text style={{marginRight: 10}}>Logout</Text>
              <AntDesign name="logout" color={Color.primary} size={25} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <Image
              style={{height: 50, width: 50}}
              source={require('../assets/logo/logo.png')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="OffreDetail"
        component={OffreDetail}
        options={{headerShown: true, title: '',
        headerLeft: () => (
            <Image
              style={{height: 50, width: 50}}
              source={require('../assets/logo/logo.png')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Proposition"
        component={Proposition}
        options={{
          headerShown: true,
          title: 'Proposition',
          presentation: 'modal',
          headerLeft: () => (
            <Image
              style={{height: 50, width: 50}}
              source={require('../assets/logo/logo.png')}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
