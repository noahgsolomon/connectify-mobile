import { ScrollView, StyleSheet, View} from 'react-native';
import Dashboard from './screens/Dashboard';
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

export default function App() {

    let [fontsLoaded] = useFonts({
        'Roboto': require('./assets/fonts/Roboto-Regular.ttf')
    });

    if (!fontsLoaded) {
        return null;
    } else {
        SplashScreen.hideAsync().then();
    }


  return (
      <View style={styles.container}>
          <ScrollView>
              <Dashboard />
          </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#232323',
    fontFamily: 'Roboto'
  },
});
