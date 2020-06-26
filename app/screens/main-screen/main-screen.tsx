import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar, Dimensions, View, Image, TextStyle, ImageStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, More, Menu, News } from "../../components"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import { translate } from "../../i18n"
import { useStores } from "../../models/root-store"

const more = require("./images/tab/more.png")
const moreSelected = require("./images/tab/more-selected.png")
const news = require("./images/tab/news.png")
const newsSelected = require("./images/tab/news-selected.png")

export interface MainScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: "#f0eff4",
}

const TAB: ViewStyle = {
  backgroundColor: "#f8f8f8",
}

const TAB_INDICATOR: ViewStyle = {
  backgroundColor: "#f8f8f8",
}

const TAB_SECTION: ViewStyle = {
  alignItems: "center",
}

const TAB_IMAGE: ImageStyle = {
  resizeMode: "contain",
  height: 28,
}

const TAB_TEXT: TextStyle = {
  color: "#004583",
}

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={TAB_INDICATOR}
    style={TAB}
    renderLabel={({ route, focused }) =>
      route.key === "news" ? (
        <View style={TAB_SECTION}>
          <Image
            style={TAB_IMAGE}
            source={
              route.key === props.navigationState.routes[props.navigationState.index].key
                ? newsSelected
                : news
            }
          />
          <Text
            style={{
              color:
                route.key === props.navigationState.routes[props.navigationState.index].key
                  ? "#004583"
                  : "#D0D0D0",
            }}
            tx="tab.news"
          />
        </View>
      ) : (
        <View style={TAB_SECTION}>
          <Image
            style={TAB_IMAGE}
            source={
              route.key === props.navigationState.routes[props.navigationState.index].key
                ? moreSelected
                : more
            }
          />
          <Text
            style={{
              color:
                route.key === props.navigationState.routes[props.navigationState.index].key
                  ? "#004583"
                  : "#D0D0D0",
            }}
            tx="tab.more"
          />
        </View>
      )
    }
  />
)

const initialLayout = { width: Dimensions.get("window").width }

export const MainScreen: React.FunctionComponent<MainScreenProps> = observer(props => {
  const { messageStore, loginStore } = useStores()

  const logoPress = () => {
    messageStore.saveFavourites(false)
    messageStore.clearMessages()
    messageStore.saveOffset(0)
    messageStore.getMessages(0, loginStore.accessToken, () => {
      //setTimeout(() => flatList.scrollToEnd({ animated: true }), 1500)
    })
  }

  const NewsRoute = () => <News navigation={props.navigation} />
  const MoreRoute = () => <More navigation={props.navigation} />

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "news", title: translate("tab.news") },
    { key: "more", title: translate("tab.more") },
  ])

  const renderScene = SceneMap({
    news: NewsRoute,
    more: MoreRoute,
  })

  return (
    <Screen style={ROOT} preset="fixed">
      <StatusBar barStyle="default" />
      <Menu navigation={props.navigation} onLogoPress={logoPress} />
      <TabView
        renderTabBar={renderTabBar}
        tabBarPosition="bottom"
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </Screen>
  )
})
