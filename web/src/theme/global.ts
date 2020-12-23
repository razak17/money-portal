import { createBreakpoints } from '@chakra-ui/theme-tools'
import theme from "@chakra-ui/theme";
import { mode, Styles } from "@chakra-ui/theme-tools";

export const styles: Styles = {
  ...theme.styles,
  global: (props) => ({
    body: {
      ...theme.styles.global,
      fontFamily: "body",
      fontWeight: "light",
      color: mode("brandBlue.800", "brandDark.700")(props),
      bg: mode("brandDark.200", "brandDark.700")(props),
      lineHeight: "base",
    },
    a: {
      color: "teal.500",
      textDecoration: "none",
      _hover: {
        textDecoration: "none",
      },
    },
  }),
}

export const layerStyles = {
  base: {
    bg: "gray.50",
    border: "2px solid",
    borderColor: "gray.500",
  },
  selected: {
    bg: "teal.500",
    color: "teal.700",
    borderColor: "orange.500",
  },
}


export const breakpoints = createBreakpoints({
  sm: "360px",
  md: "486px",
  lg: "980px",
  xl: "1230px",
});

