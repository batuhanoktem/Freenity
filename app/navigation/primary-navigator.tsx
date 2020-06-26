import React from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import {
  SplashScreen,
  LoginScreen,
  RegisterScreen,
  MessagesScreen,
  WebScreen,
  ImageGalleryScreen,
  WebViewScreen,
  MainScreen,
} from "../screens"
import { PrimaryParamList } from "./types"
import { translate } from "../i18n"

const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="splash" component={SplashScreen} options={{ title: "Freenity", headerShown: false }} />
      <Stack.Screen name="login" component={LoginScreen} options={{ title: translate("splashScreen.login"), headerShown: true }} />
      <Stack.Screen name="register" component={RegisterScreen} options={{ title: translate("splashScreen.register"), headerShown: true }} />
      <Stack.Screen name="main" component={MainScreen} />
      <Stack.Screen name="messages" component={MessagesScreen} />
      <Stack.Screen name="imageGallery" component={ImageGalleryScreen}  />
      <Stack.Screen name="web" component={WebScreen} />
      <Stack.Screen name="webView" component={WebViewScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["splash", "messages", "web"]
