import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ParamListBase, StackActions } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Menu } from "../../components"
import { WebView } from "react-native-webview"
import { useStores } from "../../models/root-store"
import { color } from "../../theme"
import { useState } from "react"

export interface WebScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const WebScreen: React.FunctionComponent<WebScreenProps> = observer(props => {
  const { loginStore } = useStores()

  const [disabled, setDisabled] = useState("none" as "none" | "flex")
  const [url, setUrl] = useState(
    `https://www.freenity.news/?login=${loginStore.user.login}&password=${loginStore.user.password}`,
  )

  const loginControl = "setInterval(function() { if (localStorage.getItem('default_auth_token') === null) { window.ReactNativeWebView.postMessage('logout'); }}, 1000);"

  const onNavigationStateChange = event => {
    const newUrl = event.url

    if (newUrl !== undefined) {
      if (newUrl.includes("freenity.news") && disabled !== "none") {
        setDisabled("none")

        if (!url.includes("freenity.news")) setUrl(newUrl)
      } else if (!newUrl.includes("freenity.news") && disabled !== "flex") {
        setDisabled("flex")

        if (url.includes("freenity.news")) setUrl(newUrl)
      }
    }
  }

  const onMessage = event => {
    if (event.nativeEvent.data.includes("logout")) {
      loginStore.logout()
      props.navigation.dispatch(StackActions.replace("splash"))
    }
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <Menu disabled={disabled} onLogoPress={() => setUrl("https://www.freenity.news")} />
      <WebView
        source={{
          uri: url,
        }}
        onNavigationStateChange={onNavigationStateChange}
        injectedJavaScript={loginControl}
        onMessage={onMessage}
      />
    </Screen>
  )
})
