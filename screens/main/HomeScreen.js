import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import PostsScreen from '../nestedScreens/PostsScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';

import { logOut } from '../../redux/auth/auth-operations';

import LogOutIcon from '../../components/icons/LogOut';

const NestedScreen = createStackNavigator();

export default function HomeScreen() {
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(logOut());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.8} onPress={onSubmit}>
              <LogOutIcon width={24} height={24} style={{ marginRight: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}
