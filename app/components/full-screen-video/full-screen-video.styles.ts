import { ViewStyle } from "react-native"

export const fullScreenVideoStyles = {
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  iconContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 80,
    width: 80,
    opacity: 0.3,
    borderRadius: 5
  } as ViewStyle,
  icon: {
    position: 'absolute',
    height: 80,
    width: 80
  } as ViewStyle
}
