import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';

import { persistedStore, store } from './redux/store';

import Main from './components/Main';

const App = () => {
  const [fontsLoaded] = useFonts({
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
    RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
