import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Menu } from "../../components"
import { useStores } from "../../models/root-store"
import { color } from "../../theme"
import { WebView } from "react-native-webview"

export interface WebViewScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const WebViewScreen: React.FunctionComponent<WebViewScreenProps> = observer(props => {
  const { messageStore } = useStores()
  return (
    <Screen style={ROOT} preset="fixed">
      <StatusBar barStyle="default" />
      <Menu
        navigation={props.navigation}
        onLogoPress={() => {
          props.navigation.pop()
          messageStore.saveUrl(null)
        }}
      />
      <WebView
        source={{
          uri: `${messageStore.url}?lang=${messageStore.language}`,
        }}
      />
    </Screen>
  )
})
