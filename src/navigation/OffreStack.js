import React from 'react';
import {Offre} from '../screens/Offre';
import CreateOffre from '../screens/CreateOffre';
import UpdateOffre from '../screens/UpdateOffre';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const OffreStack = () => {
  return (
    <Stack.Navigator initialRouteName='OffreCreate'>
      <Stack.Screen name="AllOffre" component={Offre}  options={{headerShown:false}}/>
      <Stack.Screen name="OffreCreate" component={CreateOffre}  options={{headerShown:false}}/>
      <Stack.Screen name="OffreUpdate" component={UpdateOffre}  options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default OffreStack;

