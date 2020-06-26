import * as React from "react"
import { ViewStyle, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { fullScreenVideoStyles as styles } from "./full-screen-video.styles"
import { useState } from "react"
import Video from "react-native-video"
import { spacing } from "../../theme"

export interface FullScreenVideoProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  source?

  paused?: boolean

  onLoad?: Function
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function FullScreenVideo(props: FullScreenVideoProps) {
  // grab the props
  const { tx, text, style, source, onLoad, ...rest } = props

  const [paused, setPaused] = useState(props.paused !== undefined ? props.paused : true)
  const [width, setWidth] = useState(style.width)
  const [height, setHeight] = useState(style.height)
  const [initialHeight, setInitialHeight] = useState(style.height)
  const maxHeight: number = Dimensions.get("window").height

  const onVideoPress = () => {
    /*
    if (paused) {
      setWidth(Dimensions.get("window").width)
      setHeight(Dimensions.get("window").height)
    } else {
      setWidth(style.width)
      setHeight(initialHeight)
    }
    */
    setPaused(!paused)
  }

  const onVideoLoad = event => {
    const style: ViewStyle = StyleSheet.flatten(props.style)
    const { width, height } = event.naturalSize
    const ratio: number = width / height

    if (!style.height) {
      const heightToRatio: number =
        width > height ? (style.width as number) / ratio : (style.width as number) * ratio
      const newHeight: number = heightToRatio > maxHeight ? maxHeight : heightToRatio
      setHeight(newHeight)

      if (initialHeight === undefined)
        setInitialHeight(newHeight)
    }

    if (onLoad) onLoad(event)
  }

  const onLayout = event => {
    const style = StyleSheet.flatten(props.style)

    if (!style.width) setWidth(event.nativeEvent.layout.width)
  }

  const onEnd = () => {
    //setWidth(style.width)
    //setHeight(initialHeight)
    setPaused(true)
    player.seek(0)
  }

  const VIDEO_CONTAINER: ViewStyle = {
    height: height,
    width: width
  }

  let player

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onVideoPress}
      onLayout={onLayout}
      style={[style, VIDEO_CONTAINER]}
    >
      <Video ref={ref => (player = ref)} source={source} paused={paused} onLoad={onVideoLoad} style={VIDEO_CONTAINER} onEnd={onEnd} />
    </TouchableOpacity>
  )
}
