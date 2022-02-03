import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react'
import AppLoading from 'expo-app-loading'
import theme from './src/global/styles/theme'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import { AppRoutes } from './src/routes/app.routes'
import { StatusBar } from 'react-native'
import { SignIn } from './src/screens/SignIn'
import { AuthProvider } from './src/hooks/auth'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <ThemeProvider theme={theme}>
        <NavigationContainer>
					<StatusBar barStyle={'light-content'} translucent  backgroundColor={theme.colors.primary}/>

					<AuthProvider>
          	<SignIn />
					</AuthProvider>
        </NavigationContainer>
      </ThemeProvider>
    )
  }
}
