import * as React from "react"
import {
  View,
  Image,
  ImageBackground,
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
  Animated,
  TextStyle,
  Linking,
} from "react-native"
import { useObserver } from "mobx-react-lite"
import { Text } from "../"
import { useStores } from "../../models/root-store"
import { menuStyles as styles } from "./menu.styles"
import { spacing, color } from "../../theme"
import Select2 from "react-native-select-two"
import { Dropdown } from "react-native-material-dropdown"
import { translate } from "../../i18n"
import { Button } from "../button/button"
import { StackActions, ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { useRef, useState } from "react"
const header = require("./images/header.png")
const hamburger = require("./images/icn-menu.png")
const logo = require("../../images/logo.png")
const favourite = require("./images/star.png")

export interface MenuProps {
  disabled?: "none" | "flex"
  onLogoPress?: Function
  navigation: NativeStackNavigationProp<ParamListBase>
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const Menu: React.FunctionComponent<MenuProps> = props => {
  const { disabled, ...rest } = props

  const style: ViewStyle = {
    display: disabled,
    flexDirection: "column",
  }

  const MENU_STYLE: ViewStyle = {
    flexDirection: "row",
  }

  const LOGO: ViewStyle = {
    flex: 2,
  }

  const READ_ON: ViewStyle = {
    flex: 1,
    marginTop: spacing[6],
  }

  const LANGUAGES: ViewStyle = {
    flex: 2,
  }

  const HAMBURGER: ViewStyle = {
    flex: 2,
  }

  const HAMBURGER_LOGO: ImageStyle = {
    margin: spacing[3],
    height: 60,
    width: "60%",
    resizeMode: "contain",
  }

  const opacityHamburger = useRef(new Animated.Value(0)).current
  const [displayHamburger, setDisplayHamburger] = useState("none" as "none" | "flex")

  const HAMBURGER_POPUP: ViewStyle = {
    display: displayHamburger,
    backgroundColor: color.palette.blueDarker,
    padding: spacing[3],
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    opacity: opacityHamburger,
    //zIndex: 1
  }

  const HAMBURGER_TEXT: TextStyle = {
    textAlign: "center",
    color: color.text,
    marginTop: spacing[1],
  }

  const DESCRIPTION: TextStyle = {
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderColor: color.palette.white,
  }

  const PRIVACY_AGREEMENT: ViewStyle = {
    flexDirection: "row",
  }

  const USER_AGREEMENT: ViewStyle = {
    marginLeft: spacing[3],
  }

  const BUTTONS: ViewStyle = {
    marginTop: spacing[3],
    paddingTop: spacing[3],
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: color.palette.white,
  }

  const HAMBURGER_BUTTON: TextStyle = {
    color: color.text,
    textDecorationLine: "none",
  }

  const FAVOURITES: ViewStyle = {
    paddingRight: spacing[7],
  }

  const LOGOUT: ViewStyle = {
    borderLeftWidth: 1,
    borderRadius: 0,
    borderLeftColor: color.palette.white,
    paddingLeft: spacing[7],
  }

  const onLogoPress = () => {
    if (props.onLogoPress) props.onLogoPress()
  }

  const [popupOpen, setPopupOpen] = useState(false)

  const onHamburgerPress = () => {
    if (!popupOpen) {
      setDisplayHamburger("flex")
      Animated.timing(opacityHamburger, {
        toValue: 1,
        duration: 500,
      }).start(() => {
        setPopupOpen(true)
      })
    } else {
      Animated.timing(opacityHamburger, {
        toValue: 0,
        duration: 500,
      }).start(() => {
        setPopupOpen(false)
        setDisplayHamburger("none")
      })
    }
  }

  const onSelectLanguage = data => {
    messageStore.saveLanguage(data)
    messageStore.clearMessages()
    messageStore.saveOffset(0)
    messageStore.getMessages(0, messageStore.language, loginStore.accessToken, () => {
      setTimeout(() => messageStore.saveScrolling(true), 1500)
    })
  }

  const { loginStore, messageStore } = useStores()

  const onFavourites = () => {
    onHamburgerPress()
    messageStore.saveFavourites(true)
    messageStore.clearMessages()
    messageStore.saveOffset(0)
    messageStore.getMessages(0, messageStore.language, loginStore.accessToken, () => {
      setTimeout(() => messageStore.saveScrolling(true), 1500)
    })

    if (messageStore.url !== null) {
      props.navigation.pop()
      messageStore.saveUrl(null)
    }
  }

  const onLogout = () => {
    loginStore.logout()
    props.navigation.dispatch(StackActions.replace("splash"))
    if (popupOpen) {
      Animated.timing(opacityHamburger, {
        toValue: 0,
        duration: 2000,
      }).start()
      setPopupOpen(false)
    }
  }

  const languages = [
    { value: "af", label: "Afrikaans" },
    { value: "am", label: "አማርኛ" },
    { value: "ar", label: "العربية" },
    { value: "az", label: "Azərbaycan" },
    { value: "be", label: "беларускі" },
    { value: "bg", label: "български" },
    { value: "bn", label: "বাঙালি" },
    { value: "bs", label: "Bosanski" },
    { value: "ca", label: "Català" },
    { value: "ceb", label: "Cebuano" },
    { value: "co", label: "Corsa" },
    { value: "cs", label: "Česky" },
    { value: "cy", label: "Cymraeg" },
    { value: "da", label: "dansk" },
    { value: "de", label: "Deutsch" },
    { value: "el", label: "Ελληνικά" },
    { value: "en", label: "English" },
    { value: "eo", label: "Esperanto" },
    { value: "es", label: "Español" },
    { value: "et", label: "Eesti keel" },
    { value: "eu", label: "Euskal" },
    { value: "fa", label: "فارسی" },
    { value: "fi", label: "suomalainen" },
    { value: "fr", label: "Le français" },
    { value: "fy", label: "Frysk" },
    { value: "ga", label: "Gaeilge" },
    { value: "gd", label: "Gàidhlig" },
    { value: "gl", label: "Galego" },
    { value: "gu", label: "ગુજરાતી" },
    { value: "ha", label: "Gidan" },
    { value: "haw", label: "Hawaiian" },
    { value: "hi", label: "हिन्दी" },
    { value: "hmn", label: "Hmoob" },
    { value: "hr", label: "hrvatski" },
    { value: "ht", label: "Ayisyen" },
    { value: "hu", label: "magyar" },
    { value: "hy", label: "Հայերեն" },
    { value: "id", label: "Orang indonesia" },
    { value: "ig", label: "Igbo" },
    { value: "is", label: "Íslensku" },
    { value: "it", label: "italiano" },
    { value: "iw", label: "עברית" },
    { value: "ja", label: "日本語" },
    { value: "jw", label: "Jawa" },
    { value: "ka", label: "ქართული" },
    { value: "kk", label: "Қазақша" },
    { value: "km", label: "ភាសាខ្មែរ" },
    { value: "kn", label: "ಕನ್ನಡ" },
    { value: "ko", label: "한국어" },
    { value: "ku", label: "Kurdî" },
    { value: "ky", label: "Кыргыз" },
    { value: "la", label: "Latine" },
    { value: "lb", label: "Lëtzebuergesch" },
    { value: "lo", label: "ລາວ" },
    { value: "lt", label: "Lietuvių" },
    { value: "lv", label: "Latviešu valoda" },
    { value: "mg", label: "Malagasy" },
    { value: "mi", label: "Maori" },
    { value: "mk", label: "Македонски" },
    { value: "ml", label: "മലയാളം" },
    { value: "mn", label: "Монгол хэл дээр" },
    { value: "mr", label: "मराठी" },
    { value: "ms", label: "Melayu" },
    { value: "mt", label: "Malti" },
    { value: "my", label: "မြန်မာ" },
    { value: "ne", label: "नेपाली" },
    { value: "nl", label: "Nederlands" },
    { value: "no", label: "norsk" },
    { value: "ny", label: "Nyanja" },
    { value: "pa", label: "ਪੰਜਾਬੀ" },
    { value: "pl", label: "Polski" },
    { value: "ps", label: "پښتو" },
    { value: "pt", label: "Português" },
    { value: "ro", label: "românesc" },
    { value: "ru", label: "Русский" },
    { value: "sd", label: "سنڌي" },
    { value: "si", label: "සිංහල" },
    { value: "sk", label: "slovenský" },
    { value: "sl", label: "Slovenščina" },
    { value: "sm", label: "Samoa" },
    { value: "sn", label: "Shona" },
    { value: "so", label: "Soomaaliya" },
    { value: "sq", label: "shqiptar" },
    { value: "sr", label: "Сербиан" },
    { value: "st", label: "Soto ka boroa" },
    { value: "su", label: "Sunda" },
    { value: "sv", label: "Svenska" },
    { value: "sw", label: "Kiswahili" },
    { value: "ta", label: "தமிழ்" },
    { value: "te", label: "తెలుగు" },
    { value: "tg", label: "Тоҷикӣ" },
    { value: "th", label: "ไทย" },
    { value: "tl", label: "Filipino" },
    { value: "tr", label: "Türk" },
    { value: "uk", label: "Український" },
    { value: "ur", label: "اردو" },
    { value: "uz", label: "O'zbek" },
    { value: "vi", label: "Tiếng việt" },
    { value: "xh", label: "Spit" },
    { value: "yi", label: "Yiddish" },
    { value: "yo", label: "Yorùbá" },
    { value: "zh", label: "中國" },
    { value: "zu", label: "Zulu" },
  ]

  return useObserver(() => (
    <View style={[styles.WRAPPER, style]}>
      <ImageBackground source={header} style={[styles.HEADER, MENU_STYLE]}>
        <TouchableOpacity onPress={onLogoPress} style={LOGO}>
          <Image source={logo} style={styles.LOGO} />
        </TouchableOpacity>
        <Text style={READ_ON} tx="menu.readOn" />
        <Dropdown
          containerStyle={LANGUAGES}
          overlayStyle={LANGUAGES}
          textColor="#fff"
          selectedItemColor="#000"
          data={languages}
          value={messageStore.language}
          onChangeText={onSelectLanguage}
        />
      </ImageBackground>
    </View>
  ))
}
