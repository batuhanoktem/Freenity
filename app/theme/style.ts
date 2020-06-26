import { StyleSheet } from "react-native"
import { color } from "./color"

export const style = StyleSheet.create({
  backgroundImage: {
    backgroundColor: color.palette.white,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  }
})
