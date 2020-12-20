import { extendTheme } from '@chakra-ui/react'
import theme  from "@chakra-ui/theme";
import { colors  } from './colors';
import { fontSizes, fonts, fontWeights } from './fonts';
import { styles, breakpoints } from './global';
import { Link, Accordion } from './components/link';
import { Button } from './components/button';
import { textStyles } from './textStyles';

// const MDXWrapper = (props) => <div className="mdx-prose" {...props} />

const customTheme = {
  ...theme,
  styles: {
    styles
  },
  textStyles,
  colors,
  fonts,
  fontSizes,
  breakpoints,
  fontWeights,
  config: {
    ...theme.config,
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  components: {
    ...theme.components,
    Button,
    Link,
    Accordion
  },
}

export default extendTheme(customTheme);
