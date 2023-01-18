import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import { useRoute } from "./router";

const App = () => {
  const routing = useRoute(true);

  const [fontsLoaded] = useFonts({
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default App;
