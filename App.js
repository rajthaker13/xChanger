import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import StartScreen from './screens/StartScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify, {Storage} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import LoginScreen from './screens/LoginScreen';
import { withAuthenticator } from 'aws-amplify-react-native';
import RegisterScreen from './screens/RegisterScreen'

Amplify.configure(awsconfig);
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="HomeScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;