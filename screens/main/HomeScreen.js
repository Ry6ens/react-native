import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../nestedScreens/PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

import LogOutIcon from "../../components/icons/LogOut";

const NestedScreen = createStackNavigator();

export default function HomeScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <LogOutIcon
              width={24}
              height={24}
              style={{ marginRight: 20 }}
              onPress={() => {}}
            />
          ),
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}
