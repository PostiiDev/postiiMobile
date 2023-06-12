import React from 'react';
import {Offre} from '../screens/Offre';
import CreateOffre from '../screens/CreateOffre';
import UpdateOffre from '../screens/UpdateOffre';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OffreDetail from '../screens/OffreDetail';
import {Image} from 'react-native'
import Proposition from '../screens/Proposition';
const Stack = createNativeStackNavigator();

const OffreStack = () => {
  return (
    <Stack.Navigator initialRouteName="AllOffre">
      <Stack.Screen
        name="AllOffre"
        component={Offre}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OffreCreate"
        component={CreateOffre}
        options={{
          headerShown: true,
          title: '',
          headerRight: () => (
            <Image
              style={{height: 50, width: 50}}
              source={require('../assets/logo/logo.png')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="OffreUpdate"
        component={UpdateOffre}
        options={{
          headerShown: true,
          title: '',
          headerRight: () => (
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
        options={{
          headerShown: true,
          title: '',
          headerRight: () => (
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
          title: '',
          headerRight: () => (
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

export default OffreStack;
