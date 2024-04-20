import React from 'react';
import AuthStackNavigator from '../stack/AuthStackNavigation';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';

export default function RootNavigator() {
  const isLoggedIn = false;

  return <>{isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}
