import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import ChatRoom from '../screens/ChatRoom';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{gestureEnabled: false}}>
        {/* <Stack.Screen name="Bottom Nav" component={BottomNavigationBar} /> */}
        <Stack.Screen
          options={{headerShown: false}}
          name="Splash"
          component={Splash}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />

<Stack.Screen
          options={{headerShown: false}}
          name="Chat"
          component={ChatRoom}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
