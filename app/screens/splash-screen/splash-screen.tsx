import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ImageBackground, Image, ImageStyle, StatusBar, View, TextStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button } from "../../components"
// import { useStores } from "../models/root-store"
import { color, style, spacing } from "../../theme"
const backgroundImage = require("../../images/background.png")
const logo = require("../../images/logo.png")

export interface SplashScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

const TEXT_BACKGROUND: ViewStyle = {
  backgroundColor: color.palette.white,
  position: "absolute",
  width: "100%",
  height: "58%",
  bottom: 0,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
}

const WELCOME_TEXT: TextStyle = {
  fontSize: 24,
  color: "#333333",
  marginTop: 27,
  alignSelf: "center"
}

const WELCOME_SUBTEXT: TextStyle = {
  fontSize: 16,
  color: "#8C949F",
  marginTop: 5,
  alignSelf: "center",
  textAlign: "center"
}

const LOGO: ImageStyle = {
  position: "absolute",
  top: "17%",
  width: "50%",
  height: "20%",
  resizeMode: "contain",
}

const LOGIN: ViewStyle = {
  backgroundColor: "#004583",
  width: "72%",
  height: 44,
  borderRadius: 22,
  marginTop: 27,
  alignSelf: "center"
}

const LOGIN_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  color: color.palette.white
}

const REGISTER: ViewStyle = {
  backgroundColor: color.palette.white,
  width: "72%",
  height: 44,
  borderRadius: 22,
  marginTop: 12,
  alignSelf: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 15,

  elevation: 5,
}

const REGISTER_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  color: "#192A3E"
}

export const SplashScreen: React.FunctionComponent<SplashScreenProps> = observer(props => {

  const loginScreen = React.useMemo(() => () => props.navigation.navigate("login"), [
    props.navigation,
  ])

  const registerScreen = React.useMemo(() => () => props.navigation.navigate("register"), [
    props.navigation,
  ])

  return (
    <ImageBackground source={backgroundImage} style={style.backgroundImage}>
      <StatusBar barStyle="light-content" />
      <Image source={logo} style={LOGO} />
      <View style={TEXT_BACKGROUND}>
        <Text style={WELCOME_TEXT} preset="header" tx="splashScreen.header" />
        <Text style={WELCOME_SUBTEXT}  tx="splashScreen.subtitle" />
        <Button tx="splashScreen.login" style={LOGIN} textStyle={LOGIN_TEXT} onPress={loginScreen} />
        <Button tx="splashScreen.register" style={REGISTER} textStyle={REGISTER_TEXT} onPress={registerScreen} />
      </View>

    </ImageBackground>
  )
})
