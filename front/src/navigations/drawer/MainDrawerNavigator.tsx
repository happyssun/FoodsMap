import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MapHomeScreen from '../../screens/MapHomeScreen';

export default function MainDrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapHome" component={MapHomeScreen} />
    </Drawer.Navigator>
  );
}
