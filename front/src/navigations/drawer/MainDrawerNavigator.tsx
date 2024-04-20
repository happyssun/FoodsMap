import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MapHomeScreen from '../../screens/MapHomeScreen';
import FeedHomeScreen from '../../screens/feed/FeedHomeScreen';

function MainDrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapHome" component={MapHomeScreen} />
      <Drawer.Screen name="FeedHome" component={FeedHomeScreen} />
      <Drawer.Screen name="CalendarHome" component={FeedHomeScreen} />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
