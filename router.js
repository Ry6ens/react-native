import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity } from "react-native";

import Login from "./screens/auth/Login";
import Registration from "./screens/auth/Registration";
import Home from "./screens/nestedScreens/PostsScreen";
import HomeScreen from "./screens/main/HomeScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import ProfileScreen from "./screens/main/ProfileScreen";

import HomeIcon from "./components/icons/Home";
import CreatePostsIcon from "./components/icons/CreatePosts";
import ProfileIcon from "./components/icons/Profile";
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
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            tabBarIcon: () => <HomeIcon width={34} height={34} />,
            headerShown: false,
          }}
        />
        <MainTab.Screen
          name="CreatePostsScreen"
          component={CreatePostsScreen}
          options={({ navigation }) => ({
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
                <CreatePostsIcon width={13} height={13} />
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  marginLeft: 20,
                  width: 25,
                  height: 25,
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("Posts")}
              >
                <ArrowLeftIcon width={24} height={24} />
              </TouchableOpacity>
            ),
          })}
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => <ProfileIcon width={24} height={24} />,
          }}
        />
      </MainTab.Navigator>
    );
  }
};
