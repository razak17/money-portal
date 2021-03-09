import { mode } from "@chakra-ui/theme-tools";

export const Button = (props: any) =>  ({
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    bg: mode("brandDark.200", "gray.900")(props),
    color: mode("brandDark.200", "gray.900")(props),
    _hover: {
      bg: "green.400",
    },
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "10px",
      padding: "14px",
    },
    md: {
      fontSize: "16px",
      padding: "24px",
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      borderColor: mode("red.800", "gray.600")(props),
      border: "2px solid",
    },
    solid: {
      bg: "green.500",
      color: "white",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "sm",
    variant: "solid",
  },
});
