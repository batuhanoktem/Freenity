import * as React from "react"
import { View, Linking, TextStyle, ViewStyle, Image } from "react-native"
import { useObserver } from "mobx-react-lite"
import { Text, Button } from "../"
import { Cell, Section, TableView } from "react-native-tableview-simple"
import { useStores } from "../../models/root-store"
import { moreStyles as styles } from "./more.styles"
import { translate } from "../../i18n"
import { color, spacing } from "../../theme"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { StackActions } from "@react-navigation/native"
const userAgreement = require("./images/user-agreement.png")
const privacyPolicy = require("./images/privacy-policy.png")

export interface MoreProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const TABLE: ViewStyle = {
  width: "100%",
  height: "100%",
}

const ABOUT_TEXT: TextStyle = {
  color: "#333333",
  marginTop: spacing[3],
}

const ABOUT_LINK: TextStyle = {
  color: "#007BFF",
  marginTop: spacing[1],
}

const ABOUT_WEBSITE: TextStyle = {
  marginTop: spacing[3],
}

const ABOUT_MAIL: TextStyle = {
  marginBottom: spacing[5],
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const More: React.FunctionComponent<MoreProps> = props => {
  const { loginStore } = useStores()

  const AboutCell = props => (
    <Cell
      {...props}
      cellContentView={
        <View>
          <Text tx="menu.description" style={ABOUT_TEXT} />
          <Button
            textStyle={[ABOUT_LINK, ABOUT_WEBSITE]}
            preset="link"
            text="www.freenity.info"
            onPress={() => Linking.openURL("https://www.freenity.info")}
          />
          <Button
            textStyle={ABOUT_LINK}
            preset="link"
            text="www.instagram.com/freenitynews"
            onPress={() => Linking.openURL("https://www.instagram.com/freenitynews")}
          />
          <Button
            textStyle={[ABOUT_LINK, ABOUT_MAIL]}
            preset="link"
            text="freenitynews@gmail.com"
            onPress={() => Linking.openURL("mailto:freenitynews@gmail.com")}
          />
        </View>
      }
    />
  )

  const logout = () => {
    loginStore.logout()
    props.navigation.dispatch(StackActions.replace("splash"))
  }

  return useObserver(() => (
    <TableView>
      <Section header={translate("menu.about")}>
        <AboutCell />
        <Cell
          image={<Image source={userAgreement} />}
          cellStyle="Basic"
          title={translate("menu.userAgreement")}
          accessory="DisclosureIndicator"
          onPress={() => console.log("")}
        />
        <Cell
          image={<Image source={privacyPolicy} />}
          cellStyle="Basic"
          title={translate("menu.privacyPolicy")}
          accessory="DisclosureIndicator"
          onPress={() => console.log("")}
        />
      </Section>
      <Section header={translate("menu.account")}>
        <Cell
          cellStyle="Basic"
          title={translate("common.logout")}
          accessory="DisclosureIndicator"
          onPress={logout}
        />
      </Section>
    </TableView>
  ))
}
