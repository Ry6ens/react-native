import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

import Login from "./screens/auth/Login";
import Registration from "./screens/auth/Registration";
import Home from "./screens/main/Home";
import PostsScreen from "./screens/main/PostsScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import ProfileScreen from "./screens/main/ProfileScreen";

import PostsScreenIcon from "./components/icons/PostsScreen";
import CreatePostsIcon from "./components/icons/CreatePosts";
import ProfileIcon from "./components/icons/Profile";
import LogOutIcon from "./components/icons/LogOut";
import ArrowLeftIcon from "./components/icons/ArrowLeft";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <MainStack.Screen name="Home" component={Home} />
      </MainStack.Navigator>
    );
  }

  if (isAuth) {
    return (
      <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <MainTab.Screen
          name="PostsScreen"
          component={PostsScreen}
          options={{
            title: "Posts",
            tabBarIcon: () => <PostsScreenIcon />,
            headerRight: () => (
              <LogOutIcon
                onPress={() => alert("This is a button!")}
                style={{ marginRight: 25 }}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="CreatePostsScreen"
          component={CreatePostsScreen}
          options={{
            title: "Create Post",
            tabBarIcon: () => (
              <View
                style={{
                  width: 70,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FF6C00",
                  borderRadius: "20",
                }}
              >
                <CreatePostsIcon />
              </View>
            ),
            headerLeft: () => (
              <ArrowLeftIcon
                onPress={() => alert("This is a button!")}
                style={{ marginLeft: 20 }}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => <ProfileIcon />,
          }}
        />
      </MainTab.Navigator>
    );
  }
};
