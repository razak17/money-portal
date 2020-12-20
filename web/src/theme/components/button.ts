import theme from "@chakra-ui/theme";

export const Button = {
  ...theme.components.Button,
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    _hover: {
      bg: "green.50",
    },
    _focus: {
      boxShadow: 'none',
    },
  },
  sizes: {
    xs: {
      fontSize: "10px",
      padding: "14px",
    },
    sm: {
      fontSize: "14px",
      padding: "18px",
    },
    md: {
      fontSize: "16px",
      padding: "24px",
    },
  },
  variants: {
    solid: {
      // _hover: {
        // bg: "green.50",
      // },
    },
    outline: {
      border: "1px solid",
    },
    link: {
      textDecoration: "none",
      _hover: {
        textDecoration: "none",
        color: "gray.500"
      },
      border: "none",
    },
  },
  defaultProps: {
    size: "sm",
    variant: "outline",
  },
};

