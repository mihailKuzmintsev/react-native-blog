import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from '../screens/MainScreen'
import PostScreen from '../screens/PostScreen'
import AboutScreen from '../screens/AboutScreen'
import CreateScreen from '../screens/CreateScreen'
import BookmarkedScreen from '../screens/BookmarkedScreen'
import { THEME } from '../theme'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

const navigatorOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
    },
}

const PostNavigator = createStackNavigator(
    {
        Main: MainScreen,
        Post: PostScreen,
    },
    navigatorOptions
)

const BookedNavigator = createStackNavigator(
    {
        Booked: BookmarkedScreen,
        Post: PostScreen,
    },
    navigatorOptions
)

const bottomTabsConfig = {
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarLabel: 'Все',
            tabBarIcon: info => (
                <Ionicons name='ios-albums' size={25} color={info.tintColor}></Ionicons>
            ),
        },
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarLabel: 'Избранное',
            tabBarIcon: info => (
                <Ionicons name='ios-star' size={25} color={info.tintColor}></Ionicons>
            ),
        },
    },
}

const BottomNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(bottomTabsConfig, {
              activeTintColor: '#fff',
              shifting: true,
              barStyle: {
                  backgroundColor: THEME.MAIN_COLOR,
              },
          })
        : createBottomTabNavigator(bottomTabsConfig, {
              tabBarOptions: {
                  activeTintColor: THEME.MAIN_COLOR,
              },
          })

const AboutNavigator = createStackNavigator(
    {
        About: AboutScreen,
    },
    navigatorOptions
)

const CreateNavigator = createStackNavigator(
    {
        Create: CreateScreen,
    },
    navigatorOptions
)

const MainNavigator = createDrawerNavigator(
    {
        PostTabs: {
            screen: BottomNavigator,
            navigationOptions: {
                drawerLabel: 'Главная',
                drawerIcon: <Ionicons name='ios-home' size={24}></Ionicons>,
            },
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'О приложении',
                drawerIcon: <Ionicons name='ios-information-circle-outline' size={24}></Ionicons>,
            },
        },
        Create: {
            screen: CreateNavigator,
            navigationOptions: {
                drawerLabel: 'Создать пост',
                drawerIcon: <Ionicons name='ios-create' size={24}></Ionicons>,
            },
        },
    },
    {
        contentOptions: {
            activeTintColor: THEME.MAIN_COLOR,
            labelStyle: {
                fontFamily: 'open-bold',
            },
        },
    }
)

export const AppNavigation = createAppContainer(MainNavigator)
