import * as React from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
  Dimensions,
  TouchableOpacity,
  Alert,
  Share,
  Linking,
} from "react-native"
import { Text, Button, FullScreenVideo } from "../"
import { Message as MessageModel } from "../../models/message"
import { color, spacing } from "../../theme"
import AutoHeightImage from "react-native-auto-height-image"
import { translate } from "../../i18n"
import { useStores } from "../../models/root-store"
import { useState } from "react"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { ParamListBase } from "@react-navigation/native"
import { getSnapshot } from "mobx-state-tree"

const logo = require("./images/freenity.png")
const remove = require("./images/close.png")
const share = require("./images/share-variant.png")
const favourite = require("./images/favourite.png")
const unfavourite = require("./images/unfavourite.png")

export interface MessageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  textStyle?: TextStyle

  /**
   * Message model
   */
  message: MessageModel

  /**
   * Message language
   */
  language: string

  navigation: NativeStackNavigationProp<ParamListBase>
}

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  flex: 1,
}

const BUTTONS: ViewStyle = {
  flexDirection: "column",
  width: "10%",
  marginTop: spacing[5],
}

const HEADER_TEXT: TextStyle = {
  color: color.palette.black,
  fontWeight: "bold",
  marginLeft: spacing[2],
  marginTop: spacing[2],
}

const ICON: ImageStyle = {
  flex: 1,
  width: 30,
  resizeMode: "contain",
}

const FAVOURITE: ViewStyle = {
  marginTop: -50
}

const HEADER: ViewStyle = {
  flexDirection: "column",
  width: "90%",
}

const HEADER_LOGO: ViewStyle = {
  flexDirection: "row",
}

const LOGO: ImageStyle = {
  width: "10%",
  height: 40,
  resizeMode: "contain",
}

const MESSAGE: ViewStyle = {
  backgroundColor: color.palette.white,
  borderRadius: 20,
  margin: spacing[4],
  padding: spacing[3],
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowOffset: {
    width: 4,
    height: 4,
  },
  elevation: 10,
  width: "80%",
}

const MESSAGE_TEXT: TextStyle = {
  color: color.palette.black,
}

const SITE_NAME: ViewStyle = {
  marginLeft: spacing[7],
  marginTop: spacing[4],
  flexDirection: "row",
}

const LINK: ViewStyle = {
  flexDirection: "row",
}

const AUTHOR: ViewStyle = {
  marginLeft: spacing[7],
  width: "90%",
}

const AUTHOR_URL: ViewStyle = {
  flexDirection: "row",
}

const AUTHOR_NAME: ViewStyle = {
  flexDirection: "row",
}

const TITLE: TextStyle = {
  color: color.palette.black,
  fontWeight: "bold",
}

const DESCRIPTION: TextStyle = {
  marginTop: spacing[4],
  marginBottom: spacing[4],
  color: color.palette.black,
}

const FILES: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "center",
}

const SINGLE_IMAGE: ImageStyle = {
  marginTop: spacing[4],
  marginBottom: spacing[4],
  borderRadius: 10,
}

const DOUBLE_IMAGE_LEFT: ImageStyle = {
  marginTop: spacing[4],
  marginBottom: spacing[4],
  borderRadius: 10,
}

const DOUBLE_IMAGE_RIGHT: ImageStyle = {
  marginTop: spacing[4],
  marginBottom: spacing[4],
  marginLeft: spacing[3],
  borderRadius: 10,
}

const SINGLE_VIDEO: ViewStyle = {
  width: Dimensions.get("window").width * 0.8,
  marginTop: spacing[4],
  marginBottom: spacing[4],
}

const DOUBLE_VIDEO_LEFT: ViewStyle = {
  width: Dimensions.get("window").width * 0.3,
  marginTop: spacing[4],
  marginBottom: spacing[4],
  borderRadius: 10,
}

const DOUBLE_VIDEO_RIGHT: ViewStyle = {
  width: Dimensions.get("window").width * 0.3,
  //height: Dimensions.get("window").width * 0.3 * (9 / 16),
  marginTop: spacing[4],
  marginBottom: spacing[4],
  marginLeft: spacing[3],
  borderRadius: 10,
}

const MESSAGE_DATE: TextStyle = {
  //marginTop: spacing[1],
  fontSize: 9,
  //marginLeft: spacing[1],
  color: "rgba(51,51,51,0.2)",
}

const MESSAGE_VIEW: TextStyle = {
  //marginTop: spacing[1],
  fontSize: 9,
  //marginLeft: spacing[1],
  color: "rgba(51,51,51,0.2)",
}

const MESSAGE_INFO: ViewStyle = {
  flexDirection: "row",
  marginRight: 74,
  padding: 0,
  alignSelf: "flex-end",
}

const MESSAGE_BUTTONS: ViewStyle = {
  borderTopColor: "#E7E7E7",
  borderTopWidth: 1,
  marginLeft: -12,
  marginRight: -12,
}

const REMOVE: ImageStyle = {
  height: 17,
  resizeMode: "contain",
  alignSelf: "flex-end",
  paddingTop: 50,
  marginRight: 10.74,
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Message(props: MessageProps) {
  // grab the props

  const { loginStore, messageStore } = useStores()

  const { style, textStyle, message, language, navigation, ...rest } = props

  const siteNamePress = () => {
    messageStore.saveUrl(message.url)
    navigation.navigate("webView")
  }
  const authorNameLinkPress = () => {
    messageStore.saveUrl(`https:${message.author.url}`)
    navigation.navigate("webView")
  }
  const removePress = () => {
    Alert.alert(
      translate("common.confirm"),
      translate("messageScreen.removeQuestion"),
      [
        {
          text: translate("common.cancel"),
          onPress: () => __DEV__ && console.tron.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: translate("common.confirm"),
          onPress: () => messageStore.deleteMessage(message.id, loginStore.accessToken),
        },
      ],
      { cancelable: false },
    )
  }

  const [isFavourite, setIsFavourite] = useState(message.is_favourite)
  const toggleFavourite = async () => {
    const result: boolean = await messageStore.favouriteMessage(message.id, loginStore.accessToken)

    if (result) {
      message.toggleFavourite()
      setIsFavourite(message.is_favourite)

      if (messageStore.favourites && !messageStore.refreshing) {
        messageStore.getMessages(0, loginStore.accessToken)
      }
    }
  }

  const favouritePress = async () => {
    if (message.is_favourite) {
      Alert.alert(
        translate("common.confirm"),
        translate("messageScreen.unfavouriteQuestion"),
        [
          {
            text: translate("common.cancel"),
            onPress: () => __DEV__ && console.tron.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: translate("common.confirm"),
            onPress: async () => await toggleFavourite(),
          },
        ],
        { cancelable: false },
      )
    } else {
      await toggleFavourite()
    }
  }

  const getFiles = () => {
    let files = []

    for (let i = 0; i < message.files.length; i++) {
      const file = message.files[i]

      if (file.type === "image") {
        if (i !== message.files.length - 1 && i % 2 == 0) {
          files.push(
            <TouchableOpacity style={FILES} onPress={() => imagePress(i)}>
              <AutoHeightImage
                key={file.name}
                width={Dimensions.get("window").width * 0.7}
                source={{ uri: file.preview }}
                style={SINGLE_IMAGE}
              />
            </TouchableOpacity>,
          )
          files.push(<View></View>)
        } else if (i !== message.files.length - 1 && i % 2 == 1) {
          files.push(
            <TouchableOpacity style={FILES} onPress={() => imagePress(i)}>
              <AutoHeightImage
                key={file.name}
                width={Dimensions.get("window").width * 0.7}
                source={{ uri: file.preview }}
                style={SINGLE_IMAGE}
              />
            </TouchableOpacity>,
          )
        }
      } else if (file.type == "video") {
        if (i !== message.files.length - 1 && i % 2 == 0)
          files.push(
            <FullScreenVideo
              key={file.name}
              source={{ uri: file.url }}
              style={SINGLE_VIDEO}
            />,
          )
        else if (i !== message.files.length - 1 && i % 2 == 1)
          files.push(
            <FullScreenVideo
              key={file.name}
              source={{ uri: file.url }}
              style={SINGLE_VIDEO}
            />,
          )
      }
    }
    return files
  }

  const sharePress = () => {
    const url: string = `https://www.freenity.news/${message.id}?lang=${language}`
    Share.share({
      url: url,
      message: url,
      title: eval("message.comment_" + language),
    })
  }

  const imagePress = (i: number) => {
    messageStore.saveActiveFiles(
      message.files
        .filter(m => m.type === "image" && (m.url.startsWith("http") || m.url.startsWith("ftp")))
        .map(m => getSnapshot(m)),
    )
    if (i > messageStore.activeFiles.length - 1) i = messageStore.activeFiles.length - 1

    messageStore.saveActiveFile(i)
    if (messageStore.activeFiles.length !== 0) navigation.navigate("imageGallery")
    else {
      messageStore.saveUrl(`https://www.freenity.news/viewApp/${message.id}`)
      navigation.navigate("webView")
    }
    //else Alert.alert(translate("errors.error"), translate("errors.invalidPhoto"))
  }

  return (
    <View>
      <View style={CONTAINER}>
        <View style={MESSAGE}>
          <View style={HEADER}>
            <View style={HEADER_LOGO}>
              <Image source={logo} style={LOGO} />
              <Text style={HEADER_TEXT} text="Freenity" />
            </View>
            {eval("message.comment_" + language) !== null && (
              <Text text={eval("message.comment_" + language)} style={MESSAGE_TEXT} />
            )}
          </View>

          <TouchableOpacity
            {...rest}
            onPress={() => {
              messageStore.saveUrl(`https://www.freenity.news/viewApp/${message.id}`)
              navigation.navigate("webView")
            }}
          >
            {/* {message.site_name !== null && (
              <View style={SITE_NAME}>
                <Button
                  preset="link"
                  text={message.site_name}
                  onPress={siteNamePress}
                  style={LINK}
                />
                <Text text=" " style={MESSAGE_TEXT} />
                {message.date !== null && (
                  <View style={AUTHOR_URL}>
                    <Text tx="messageScreen.from" style={MESSAGE_TEXT} />
                    <Text text=" " style={MESSAGE_TEXT} />
                    <Text text={message.date} style={MESSAGE_TEXT} />
                  </View>
                )}
              </View>
            )} */}

            {/* {message.author !== null && (
              <View style={AUTHOR}>
                {message.author.name !== null && (
                  <View style={AUTHOR_NAME}>
                    <Text tx="messageScreen.author" style={MESSAGE_TEXT} />
                    <Text text=" " style={MESSAGE_TEXT} />
                    <Button
                      preset="link"
                      text={message.author.name}
                      onPress={authorNameLinkPress}
                      style={LINK}
                    />
                  </View>
                )}
              </View>
            )} */}

            {message.files.length > 0 && <View >{getFiles()}</View>}

            {message.files.length > 0 &&
              message.files.length % 2 == 1 &&
              message.files[message.files.length - 1].type == "image" && (
                <TouchableOpacity
                  style={FILES}
                  onPress={() => imagePress(message.files.length - 1)}
                >
                  <AutoHeightImage
                    key={message.files[message.files.length - 1].name}
                    width={Dimensions.get("window").width * 0.7}
                    source={{ uri: message.files[message.files.length - 1].preview }}
                    style={SINGLE_IMAGE}
                  />
                </TouchableOpacity>
              )}

            {message.files.length > 0 &&
              message.files.length % 2 == 1 &&
              message.files[message.files.length - 1].type == "video" && (
                <View style={FILES}>
                  <FullScreenVideo
                    key={message.files[message.files.length - 1].name}
                    source={{ uri: message.files[message.files.length - 1].url }}
                    style={SINGLE_VIDEO}
                  />
                </View>
              )}

            {eval("message.title_" + language) !== null && (
              <Text text={eval("message.title_" + language)} style={TITLE} />
            )}

            {message.site_name !== null && (
              <View style={SITE_NAME}>
                <Button
                  preset="link"
                  text={message.site_name}
                  onPress={siteNamePress}
                  style={LINK}
                />
              </View>
            )}

            {eval("message.description_" + language) !== null && (
              <Text text={eval("message.description_" + language)} style={DESCRIPTION} />
            )}
          </TouchableOpacity>
          {loginStore.role === "sudo" && (
            <View style={MESSAGE_BUTTONS}>
              <TouchableOpacity onPress={removePress}>
                <Image source={remove} style={REMOVE} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={BUTTONS}>
          <TouchableOpacity onPress={sharePress}>
            <Image source={share} style={ICON} />
          </TouchableOpacity>
          <TouchableOpacity onPress={favouritePress} style={FAVOURITE}>
            <Image source={isFavourite ? favourite : unfavourite} style={ICON} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={MESSAGE_INFO}>
        {/* <Text text={message.created_at.toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) + ", " + message.created_at.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} /> */}
        <Text
          style={MESSAGE_DATE}
          text={
            message.created_at.toLocaleDateString() + ", " + message.created_at.toLocaleTimeString()
          }
        />
        <Text text="            " />
        <Text style={MESSAGE_VIEW} text={message.views + " " + translate("messageScreen.views")} />
      </View>
    </View>
  )
}
