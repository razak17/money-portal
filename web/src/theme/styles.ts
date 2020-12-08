import theme, { Theme } from "@chakra-ui/theme";
import { mode, Styles } from "@chakra-ui/theme-tools";

export const styles: Styles = {
  ...theme.styles,
  global: (props) => ({
    body: {
      ...theme.styles.global,
      fontFamily: "body",
      fontWeight: "light",
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "gray.900")(props),
      lineHeight: "base",
    },
    a: {
      textDecoration: "none",
      _hover: {
        textDecoration: "none",
      },
    },
  }),
};

export const customTheme: Theme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: `"Source Sans Pro",${theme.fonts.body}`,
    heading: `"Source Sans Pro",${theme.fonts.heading}`,
  },
  colors: {
    ...theme.colors,
    black: "#131217",
  },
  config: {
    ...theme.config,
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  styles,
};
