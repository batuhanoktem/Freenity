import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ImageBackground, Alert, StatusBar, TextStyle } from "react-native"
import { ParamListBase, StackActions } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField } from "../../components"
import { useStores } from "../../models/root-store"
import { color, style, spacing } from "../../theme"
import { User, UserModel } from "../../models/user"
import { translate } from "../../i18n"
const backgroundImage = require("../../images/background.png")

export interface RegisterScreenProps {
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

const REGISTER: ViewStyle = {
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

const ALREADYACCOUNT: TextStyle = {
  color: "#D5D5D5",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "left",
  width: "100%",
  marginLeft: 20,
  marginTop: spacing[3],
}

const LOGIN: ViewStyle = {
  marginLeft: 20,
  width: "100%",
  height: 44,
}

const LOGIN_TEXT: TextStyle = {
  color: "#004583",
  textDecorationLine: "none",
}

export const RegisterScreen: React.FunctionComponent<RegisterScreenProps> = observer(props => {
  const { loginStore } = useStores()

  let user: User = UserModel.create()

  const registerResult = (result: number) => {
    loginStore.login(user, () => {
      loginStore.getRole(
        () => {
          props.navigation.popToTop()

          if (result === 2) props.navigation.dispatch(StackActions.replace("messages"))
          else if (result === 1) props.navigation.dispatch(StackActions.replace("web"))
        },
        result => Alert.alert(translate("errors.error"), result.kind),
      )
    })
  }

  const register = () =>
    loginStore.register(user, registerResult, result =>
      Alert.alert(translate("errors.error"), result.kind),
    )

  return (
    <ImageBackground style={style.backgroundImage}>
      <StatusBar barStyle="default" />
      <Text style={TITLE} tx="registerScreen.createAccount" />
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
      <Button tx="registerScreen.register" style={REGISTER} onPress={register} />
      <Text style={ALREADYACCOUNT} tx="registerScreen.alreadyAccount" />
      <Button
        preset="link"
        tx="common.login"
        style={LOGIN}
        textStyle={LOGIN_TEXT}
        onPress={() => props.navigation.navigate("login")}
      />
    </ImageBackground>
  )
})
