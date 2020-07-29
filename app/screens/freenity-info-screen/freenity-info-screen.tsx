import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import { WebView } from "react-native-webview"

export interface FreenityInfoScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const FreenityInfoScreen: React.FunctionComponent<FreenityInfoScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  return (
    <>
      <StatusBar barStyle="default" />
      <WebView
        source={{
          uri: "https://www.freenity.info",
        }}
      />
    </>
  )
})
