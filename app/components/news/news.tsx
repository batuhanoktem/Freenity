import * as React from "react"
import {
  View,
  ImageStyle,
  ViewStyle,
  TouchableOpacity,
  Image,
  Animated,
  TextStyle,
  Keyboard,
  ImageBackground,
  FlatList,
  TextInput,
  StatusBar,
} from "react-native"
import { useObserver } from "mobx-react-lite"
import { Text, Message, Screen, TextField } from "../"
import { useStores } from "../../models/root-store"
import { newsStyles as styles } from "./news.styles"
import { spacing, color, style } from "../../theme"
import ImagePicker from "react-native-image-picker"
import DocumentPicker from "react-native-document-picker"
import { MessageRequestModel, MessageRequest } from "../../models/message-request"
import { useState, useEffect, useRef } from "react"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { ParamListBase } from "@react-navigation/native"

const backgroundImage = require("../../images/background.png")
const linkIcon = require("./images/link.png")
const linkOpenIcon = require("./images/link-open.png")
const attachmentIcon = require("./images/attachment.png")
const sentIcon = require("./images/icn-sent.png")

export interface NewsProps {
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
  justifyContent: "center"
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const News: React.FunctionComponent<NewsProps> = props => {
  const { messageStore, loginStore } = useStores()

  const adminHeight = useRef(new Animated.Value(50)).current
  const [displayFiles, setDisplayFiles] = useState("none" as "none" | "flex")
  const [displayLink, setDisplayLink] = useState("none" as "none" | "flex")

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
        messageStore.getMessages(0, messageStore.language, loginStore.accessToken)
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
  const [link, setLink] = useState(MessageRequestModel.create())
  const [refreshFiles, setRefreshFiles] = useState(false)

  const sendMessage = async () => {
    let request: MessageRequest = MessageRequestModel.create()
    if (link.comment !== null && message.comment !== null) {
      request.setComment(message.comment +  " " + link.comment)
    } else if (message.comment !== null) {
      request.setComment(message.comment)
    } else if (link.comment !== null) {
      request.setComment(link.comment)
    } else {
      request.setComment("")
    }
    const result: boolean = await messageStore.sendMessage(request, loginStore.accessToken)
    if (result) {
      ws.send(JSON.stringify({ event: "create", data: request }))
      setMessage(MessageRequestModel.create())
      setLink(MessageRequestModel.create())
      Keyboard.dismiss()
      setDisplayFiles("none")
      setDisplayLink("none")
      Animated.timing(adminHeight, {
        toValue: 50,
        duration: 1000,
      }).start()
      setTimeout(() => {
        if (flatList !== null) {
          flatList.scrollToEnd({ animated: true })
        }
      }, 1500)
    }
  }

  const ADMIN: ViewStyle = {
    width: "100%",
    height: adminHeight,
    backgroundColor: color.palette.white,
    padding: spacing[3],
  }

  const LINK: ViewStyle = {
    display: displayLink,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100
  }

  const FILES: ViewStyle = {
    display: displayFiles,
    width: "100%",
    height: 100,
  }

  const ICON: ImageStyle = {
    width: 24,
    resizeMode: "contain"
  }

  const LINK_BUTTON: ViewStyle = {
    position: "absolute",
    right: 70,
    bottom: 16
  }

  const LINK_ICON: ImageStyle = {
    width: 24,
    resizeMode: "contain",

  }

  const LINK_TEXT_FIELD_TEXT: ViewStyle = {
    borderWidth: 0,
    flex: 1,
    padding: spacing[3],
    marginLeft: spacing[4],
  }

  const LINK_TEXT_FIELD: ViewStyle = {
    width: "80%",
    marginBottom: 18
  }

  const TEXT_FIELD_TEXT: ViewStyle = {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#D9DDE1",
    flex: 1,
    padding: spacing[3],
    marginLeft: spacing[4],
  }

  const TEXT_FIELD: ViewStyle = {
    width: "80%",
    marginBottom: 18
  }

  const SENT_ICON: ImageStyle = {
    width: 30,
    resizeMode: "contain",
    marginLeft: spacing[3]
  }

  const [flatList, setFlatList] = useState(null)

  useEffect(() => {
    if (flatList !== null) {
      messageStore.clearMessages()
      messageStore.saveOffset(0)
      messageStore.getMessages(0, messageStore.language, loginStore.accessToken, () => {
        setTimeout(() => {
          if (flatList !== null) {
            flatList.scrollToEnd({ animated: true })
          }
        }, 1500)
      })

      startWebSocket()
    }
  }, [flatList])

  useEffect(() => {
    if (messageStore.scrolling && flatList !== null) {
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

      let value: number
      if (displayLink === "flex") {
        value = 100
      } else {
        value = 50
      }

      Animated.timing(adminHeight, {
        toValue: value,
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
      messageStore.getMessages(messageStore.offset, messageStore.language, loginStore.accessToken)
    }
  }

  const uploadFile = async () => {
// const file = await DocumentPicker.pick({
    //   type: [DocumentPicker.types.allFiles],
    // })

    const options = {
      title: 'Select File',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        const result: boolean = await messageStore.uploadFile(message, response, loginStore.accessToken)

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
    });
  }

  const openLink = () => {
    if (displayLink === "none") {

      let value: number
      if (displayFiles === "flex") {
        value = 200
      } else {
        value = 100
      }

      Animated.timing(adminHeight, {
        toValue: value,
        duration: 1000,
      }).start()
      setDisplayLink("flex")
    } else {

      let value: number
      if (displayFiles === "flex") {
        value = 200
      } else {
        value = 50
      }

      Animated.timing(adminHeight, {
        toValue: value,
        duration: 1000,
      }).start()
      setTimeout(() => {
        setDisplayLink("none")
      }, 1000)
    }
  }

  const logoPress = () => {
    messageStore.saveFavourites(false)
    messageStore.clearMessages()
    messageStore.saveOffset(0)
    messageStore.getMessages(0, messageStore.language, loginStore.accessToken, () => {
      setTimeout(() => {
        if (flatList !== null) {
          flatList.scrollToEnd({ animated: true })
        }
      }, 1500)
    })
  }

  return useObserver(() => (
    <View>
      <StatusBar barStyle="default" />
      <ImageBackground source={backgroundImage} style={style.backgroundImage}>
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
            <View style={LINK}>
              <Image style={ICON} source={linkIcon} />
              <TextField
                placeholderTx="messagesScreen.link"
                style={LINK_TEXT_FIELD}
                inputStyle={LINK_TEXT_FIELD_TEXT}
                value={link.comment}
                onChangeText={comment => link.setComment(comment)}
              />
            </View>
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
              <TextField
                placeholderTx="messagesScreen.news"
                style={TEXT_FIELD}
                inputStyle={TEXT_FIELD_TEXT}
                value={message.comment}
                onChangeText={comment => message.setComment(comment)}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Image style={SENT_ICON} source={sentIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={LINK_BUTTON} onPress={openLink}>
              <Image style={LINK_ICON} source={linkOpenIcon} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </ImageBackground>
    </View>
  ))
}
