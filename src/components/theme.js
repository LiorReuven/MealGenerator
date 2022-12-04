// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const components =  

{Link: {
  baseStyle: {
    // normal styling
    textDecoration: "none",
    // hover styling goes here
    _hover: {
      textDecoration: "none",
    },
  }, } }

// 3. extend the theme
const theme = extendTheme({ config, components })

export default theme