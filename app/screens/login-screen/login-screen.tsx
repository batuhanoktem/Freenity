import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ImageBackground, Alert, StatusBar, TextStyle } from "react-native"
import { ParamListBase, StackActions } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Button, Text, TextField } from "../../components"
import { useStores } from "../../models/root-store"
import { color, style, spacing } from "../../theme"
import { User, UserModel } from "../../models/user"
import { translate } from "../../i18n"
const backgroundImage = require("../../images/background.png")

export interface LoginScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

const TEXT_FIELD: ViewStyle = {
  width: "100%",
  marginTop: spacing[0],
  marginLeft: 20,
}

const LOGIN: ViewStyle = {
  width: "50%",
  marginTop: spacing[2],
  backgroundColor: "#004583",
  borderRadius: 22,
  alignSelf: "flex-start",
  marginLeft: 20,
}

const TITLE: TextStyle = {
  color: "#333333",
  fontSize: 22,
  fontWeight: "bold",
  textAlign: "left",
  width: "100%",
  marginLeft: 20,
}

const SUBTITLE: TextStyle = {
  color: "#8C949F",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "left",
  width: "100%",
  marginLeft: 20,
}

const NOACCOUNT: TextStyle = {
  color: "#D5D5D5",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "left",
  width: "100%",
  marginLeft: 20,
  marginTop: spacing[3],
}

const SIGNUP: ViewStyle = {
  marginLeft: 20,
  width: "100%",
  height: 44,
}

const SIGNUP_TEXT: TextStyle = {
  color: "#004583",
  textDecorationLine: "none",
}

export const LoginScreen: React.FunctionComponent<LoginScreenProps> = observer(props => {
  const { loginStore } = useStores()

  let user: User = UserModel.create()

  const loginResult = (result: number) => {
    loginStore.getRole(
      () => {
        props.navigation.popToTop()

        if (result === 2) props.navigation.dispatch(StackActions.replace("main"))
        else if (result === 1) props.navigation.dispatch(StackActions.replace("web"))
      },
      result => Alert.alert(translate("errors.error"), result.kind),
    )
  }

  const login = () =>
    loginStore.login(user, loginResult, result =>
      Alert.alert(translate("errors.error"), result.kind),
    )

  return (
    <ImageBackground style={style.backgroundImage}>
      <StatusBar barStyle="default" />
      <Text style={TITLE} tx="loginScreen.welcomeBack" />
      <Text style={SUBTITLE} tx="loginScreen.loginToContinue" />
      <TextField
        style={TEXT_FIELD}
        placeholderTx="common.nickname"
        onChangeText={login => user.setLogin(login)}
      />
      <TextField
        style={TEXT_FIELD}
        secureTextEntry={true}
        placeholderTx="common.password"
        textContentType="password"
        onChangeText={password => user.setPassword(password)}
      />
      <Button tx="loginScreen.login" style={LOGIN} onPress={login} />
      <Text style={NOACCOUNT} tx="loginScreen.noAccount" />
      <Button
        preset="link"
        tx="loginScreen.signUp"
        style={SIGNUP}
        textStyle={SIGNUP_TEXT}
        onPress={() => props.navigation.push("register")}
      />
    </ImageBackground>
  )
})
