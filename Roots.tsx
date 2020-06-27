import * as React from 'react';
import {Root} from 'native-base';
import {Button, Text, View, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ActiveList from './src/screens/Home/IndexHome';
import DetailActiveItem from './src/screens/Details/IndexDetailItems';

// function DetailsScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Details!</Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function SettingsScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Active Items" component={ActiveList} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// const DetailsStack = createStackNavigator();

// function DetailStackScreen() {
//   return (
//     <DetailsStack.Navigator>
//       <DetailsStack.Screen name="Details Item" component={DetailActiveItem} />
//     </DetailsStack.Navigator>
//   );
// }

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailActiveItem} />
    </SettingsStack.Navigator>
  );
}

const RootStack = createStackNavigator();

export default class App extends React.Component {
  requestPermission = async () => {
    try {
      const grantedCamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      const grantedExternalStorageRead = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Please get read external storage!',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      const grantedExternalStorageWrite = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Please get write external storage!',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (grantedExternalStorageRead === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('Storage permission denied');
      }

      if (grantedExternalStorageWrite === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('Storage permission denied');
      }

      if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  componentDidMount() {
    this.requestPermission();
  }

  render() {
    return (
      <Root>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="Active" component={HomeStackScreen} />
            <RootStack.Screen name="Deleted" component={SettingsStackScreen} />
            <RootStack.Screen
              name="Details Item"
              component={DetailActiveItem}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </Root>
    );
  }
}
