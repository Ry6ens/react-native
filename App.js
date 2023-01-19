import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import { useRoute } from "./router";

import { store } from "./redux/store";

const App = () => {
  const routing = useRoute(false);

  const [fontsLoaded] = useFonts({
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
};

export default App;
