import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const components = {
  Link: {
    baseStyle: {
      textDecoration: 'none',
      _hover: {
        textDecoration: 'none',
      },
    },
  },
};

const theme = extendTheme({ config, components });

export default theme;
