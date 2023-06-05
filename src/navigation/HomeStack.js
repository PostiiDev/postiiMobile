import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OffreDetail from '../screens/OffreDetail';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="OffreDetail"
        component={OffreDetail}
        options={{headerShown: true, title: '', presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
