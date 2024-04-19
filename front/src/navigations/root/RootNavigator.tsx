import React from 'react';
import AuthStackNavigator from '../AuthStackNavigation';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';

export default function RootNavigator() {
  // 로그인이 되었을 때
  const isLoggedIn = true;

  return <> {isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}
