import { ViewStyle, ImageStyle } from "react-native"
import { spacing } from "../../theme"

export const menuStyles = {
  WRAPPER: {
    justifyContent: "center",
    width: "100%",
  } as ViewStyle,
  HEADER: {
    resizeMode: "cover",
    width: "100%",
  } as ViewStyle,
  LOGO: {
    margin: spacing[3],
    height: 60,
    width: "70%",
    resizeMode: "contain",
  } as ImageStyle,
}
