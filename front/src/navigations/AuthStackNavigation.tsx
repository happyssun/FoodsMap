import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import AuthHomeScreen from '../screens/AuthHomeScreen';
import LoginScreen from '../screens/LoginScreen';
import authNavigations from '../constants';

// Param을 쓰는 경우 : 상세스크린과 같이 id값을 쓰는 경우에
/* 여러번 사용됨으로 상수화시켜놓음 - 파일을 만듦
const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
} as const; */

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
};

function AuthStackNavigator() {
  const Stack = createStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
      />
      <Stack.Screen name={authNavigations.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
