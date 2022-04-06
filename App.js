import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Login from './screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify, {Storage} from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


