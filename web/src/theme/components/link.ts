import { mode } from "@chakra-ui/theme-tools";
import theme  from "@chakra-ui/theme";

export const Link = {
  baseStyle: (props: any) => ({
    transition: "all 0.3s",
    cursor: "pointer",
    textDecoration: "none",
    outline: "0",
    // color: mode("gray.800", "whiteAlpha.900")(props),
    // bg: mode("gray.100", "gray.900")(props),
    _focus: {
      boxShadow: 'md',
    },
    _hover: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("brandBlue.50", "brandDark.100")(props),
      textDecoration: "none"
    },
  }),
};

export const Accordion = {
  ...theme.components.Accordion,
  // baseStyle: (props: any) => ({
    // _hover: {
      // color: mode("gray.800", "whiteAlpha.900")(props),
      // bg: mode("gray.100", "brandDark.100")(props),
    // },
  // }),
};

