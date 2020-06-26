import * as React from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  FlatList,
  ImageBackground,
  TextStyle,
  View,
  Image,
  ImageStyle,
  TouchableOpacity,
  TextInput,
  Animated,
  StatusBar,
  Keyboard,
} from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Message, Menu } from "../../components"
// import { useStores } from "../models/root-store"
import { color, style, spacing } from "../../theme"
import { useStores } from "../../models/root-store"
import { useEffect, useState, useRef } from "react"
import { MessageRequestModel } from "../../models/message-request"
import DocumentPicker from "react-native-document-picker"

const backgroundImage = require("../../images/background.png")
const attachmentIcon = require("./images/attachment.png")
const sentIcon = require("./images/icn-sent.png")

export interface MessagesScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: "#00428c",
}

const MESSAGES: ViewStyle = {}

const FILE: ImageStyle = {
  width: 80,
  height: 80,
  marginRight: spacing[3],
  resizeMode: "cover",
  borderRadius: 20,
}

const REMOVE_FILE: ViewStyle = {
  backgroundColor: color.palette.angry,
  position: "absolute",
  width: 20,
  height: 20,
  top: 0,
  right: 0,
  alignItems: "center",
  borderRadius: 20,
}

const MESSAGE_TYPE: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

export const MessagesScreen: React.FunctionComponent<MessagesScreenProps> = observer(props => {
  const { messageStore, loginStore } = useStores()

  const [linkColor, setLinkColor] = useState(color.primary)
  const [messageColor, setMessageColor] = useState(color.palette.black)
  const [messageType, setMessageType] = useState("link")

  const adminHeight = useRef(new Animated.Value(100)).current
  const [displayFiles, setDisplayFiles] = useState("none" as "none" | "flex")

  const chooseLink = () => {
    setMessageType("link")
    setLinkColor(color.primary)
    setMessageColor(color.palette.black)
  }

  const chooseMessage = () => {
    setMessageType("message")
    setLinkColor(color.palette.black)
    setMessageColor(color.primary)
  }

  let ws = new WebSocket("wss://www.freenity.news")

  const startWebSocket = () => {
    __DEV__ && console.tron.log("Websocket started.")
    ws = new WebSocket(`wss://www.freenity.news`)
    ws.onmessage = e => {
      __DEV__ && console.tron.log(`Received: ${e.data}`)

      let data = JSON.parse(e.data)
      if (data.event === "delete") {
        messageStore.deleteMessage(data.data.id, loginStore.accessToken)
      }

      if (!messageStore.refreshing) {
        messageStore.getMessages(0, loginStore.accessToken)
      }
    }
    ws.onclose = e => {
      __DEV__ && console.tron.log("Reconnecting: ", e.message)
      setTimeout(startWebSocket, 5000)
    }
    ws.onerror = e => {
      __DEV__ && console.tron.log(`Error: ${e.message}`)
    }
  }

  const [message, setMessage] = useState(MessageRequestModel.create())
  const [refreshFiles, setRefreshFiles] = useState(false)

  const sendMessage = async () => {
    const result: boolean = await messageStore.sendMessage(message, loginStore.accessToken)
    if (result) {
      ws.send(JSON.stringify({ event: "create", data: message }))
      setMessage(MessageRequestModel.create())
      Keyboard.dismiss()
      setDisplayFiles("none")
      Animated.timing(adminHeight, {
        toValue: 100,
        duration: 1000,
      }).start()
      setTimeout(() => flatList.scrollToEnd({ animated: true }), 1500)
    }
  }

  const ADMIN: ViewStyle = {
    width: "100%",
    height: adminHeight,
    backgroundColor: color.palette.white,
    padding: spacing[3],
  }

  const FILES: ViewStyle = {
    display: displayFiles,
    width: "100%",
    height: 100,
  }

  const MESSAGE_TYPE_LINK: TextStyle = {
    color: linkColor,
  }

  const MESSAGE_TYPE_MESSAGE: TextStyle = {
    color: messageColor,
  }

  const ICON: ImageStyle = {
    flex: 1,
    width: 24,
    resizeMode: "contain",
  }

  const TEXT_FIELD: ViewStyle = {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: color.palette.black,
    flex: 1,
    padding: spacing[3],
    marginLeft: spacing[4],
  }

  const SENT_ICON: ImageStyle = {
    flex: 1,
    width: 60,
    resizeMode: "contain",
    marginLeft: spacing[3],
  }

  const [flatList, setFlatList] = useState(null)

  useEffect(() => {
    if (flatList !== null) {
      messageStore.clearMessages()
      messageStore.saveOffset(0)
      messageStore.getMessages(0, loginStore.accessToken, () => {
        setTimeout(() => flatList.scrollToEnd({ animated: true }), 1500)
      })

      startWebSocket()
    }
  }, [flatList])

  useEffect(() => {
    if (messageStore.scrolling) {
      messageStore.saveScrolling(false)
      flatList.scrollToEnd({ animated: true })
    }
  }, [messageStore.scrolling])

  const renderMessage = message => {
    return (
      <Message
        navigation={props.navigation}
        message={message.item}
        language={messageStore.language}
      ></Message>
    )
  }

  const removeFile = file => {
    message.removeFile(file)
    setRefreshFiles(true)
    if (message.files.length === 0) {
      setDisplayFiles("none")
      Animated.timing(adminHeight, {
        toValue: 100,
        duration: 1000,
      }).start()
    }
  }

  const renderFile = file => {
    setRefreshFiles(false)
    const url: string = `https://www.freenity.news/${file.item.preview}`
    return (
      <View>
        <Image style={FILE} source={{ uri: url }} />
        <TouchableOpacity onPress={() => removeFile(file.item)} style={REMOVE_FILE}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const onRefresh = () => {
    if (!messageStore.refreshing) {
      messageStore.saveOffset(messageStore.offset + 10)
      messageStore.getMessages(messageStore.offset, loginStore.accessToken)
    }
  }

  const uploadFile = async () => {
    const file = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    })
    const result: boolean = await messageStore.uploadFile(message, file, loginStore.accessToken)

    if (result) {
      if (displayFiles === "none") {
        setDisplayFiles("flex")
        Animated.timing(adminHeight, {
          toValue: 200,
          duration: 1000,
        }).start()
      }
      setRefreshFiles(true)
    }
  }

  const logoPress = () => {
    messageStore.saveFavourites(false)
    messageStore.clearMessages()
    messageStore.saveOffset(0)
    messageStore.getMessages(0, loginStore.accessToken, () => {
      setTimeout(() => flatList.scrollToEnd({ animated: true }), 1500)
    })
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <StatusBar barStyle="default" />
      <ImageBackground source={backgroundImage} style={style.backgroundImage}>
        <Menu navigation={props.navigation} onLogoPress={logoPress} />
        <FlatList
          ref={ref => setFlatList(ref)}
          refreshing={messageStore.refreshing}
          onRefresh={onRefresh}
          style={MESSAGES}
          data={messageStore.reverseMessages}
          renderItem={renderMessage}
        />
        {loginStore.role === "sudo" && (
          <Animated.View style={ADMIN}>
            <FlatList
              style={FILES}
              data={message.files}
              renderItem={renderFile}
              extraData={refreshFiles}
              horizontal={true}
            />
            <View style={MESSAGE_TYPE}>
              <TouchableOpacity onPress={uploadFile}>
                <Image style={ICON} source={attachmentIcon} />
              </TouchableOpacity>
              <TextInput
                style={TEXT_FIELD}
                value={message.comment}
                onChangeText={comment => message.setComment(comment)}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Image style={SENT_ICON} source={sentIcon} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </ImageBackground>
    </Screen>
  )
})
