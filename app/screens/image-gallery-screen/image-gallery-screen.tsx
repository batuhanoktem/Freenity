import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, TextStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text } from "../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import Gallery from "react-native-image-gallery"
import { useStores } from "../../models/root-store"

export interface ImageGalleryScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

const CLOSE_GALLERY: ViewStyle = {
  position: "absolute",
  width: 40,
  height: 40,
  top: 50,
  left: 20,
  alignItems: "center",
  borderRadius: 20,
}

const CLOSE: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
  color: color.palette.white,
}

export const ImageGalleryScreen: React.FunctionComponent<ImageGalleryScreenProps> = observer(
  props => {
    const { messageStore } = useStores()

    const { navigation } = props

    const files = messageStore.activeFiles
    const index = messageStore.activeFile

    let images = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      images.push({
        source: { uri: file.url },
      })
    }

    return (
      <>
        <Gallery
          style={{ flex: 1, backgroundColor: "black" }}
          images={images}
          initialPage={index}
        />
        <TouchableOpacity onPress={() => navigation.pop()} style={CLOSE_GALLERY}>
          <Text style={CLOSE}>X</Text>
        </TouchableOpacity>
      </>
    )
  },
)
