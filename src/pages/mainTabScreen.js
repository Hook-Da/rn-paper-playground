import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomePage from './home/home';
import DetailsPage from './details/details';
import ProfilePage from './profile/profile';
import ExplorePage from './explore/explore';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009378'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <HomeStack.Screen name="Home" component={HomePage} options={{
        title: 'Дом',
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25}
            backgroundColor='#009378'
            onPress={()=>{navigation.openDrawer()}}
          ></Icon.Button>
        )
      }} />
    </HomeStack.Navigator>
)

const DetailsStackScreen = ({navigation}) => (
  <DetailsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#1f65ff'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <DetailsStack.Screen name="Details" component={DetailsPage} options={{
      title: 'Детали',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
          backgroundColor='#1f65ff'
          onPress={()=>{navigation.openDrawer()}}
        ></Icon.Button>
      )
    }} />
  </DetailsStack.Navigator>
)

const Tab = createMaterialBottomTabNavigator();

export default MainTabScreen = () => (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeStackScreen} 
        options={{
            tabBarLabel: 'Дом',
            tabBarColor: '#009378',
            tabBarIcon: ({color}) => (
                <Icon name="ios-home" color={color} size={26} />
            )
        }}
    />
      <Tab.Screen 
        name="Детали" 
        component={DetailsStackScreen} 
        options={{
            tabBarLabel: 'Детали',
            tabBarColor: '#1f65ff',
            tabBarIcon: ({color}) => (
                <Icon name="ios-notifications" color={color} size={26} />
            )
        }}
    />
      <Tab.Screen 
        name="ExplorePage" 
        component={ExplorePage} 
        options={{
            tabBarLabel: 'Разведать',
            tabBarColor: '#694fad',
            tabBarIcon: ({color}) => (
                <Icon name="ios-aperture" color={color} size={26} />
            )
        }}
    />
      <Tab.Screen 
        name="ProfilePage" 
        component={ProfilePage} 
        options={{
            tabBarLabel: 'Профиль',
            tabBarColor: '#d02860',
            tabBarIcon: ({color}) => (
                <Icon name="ios-person" color={color} size={26} />
            )
        }}
    />
    </Tab.Navigator>
)