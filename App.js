import React, { Component } from 'react'
import { Text, View } from 'react-native'
//import {fetchResults} from './api'
import { createAppContainer} from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'
import ScreenHome from './screens/screenHome'
import ScreenMovieInfo from './screens/screenMovieInfo'

const AppNavigator = createStackNavigator(
  {
    Home: ScreenHome,
    MovieInfo: ScreenMovieInfo,
  },
  {
    initialRouteName: 'Home',
  }
)
const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {


  render() {
    return (
        <AppContainer />
    
    )
  }
}
