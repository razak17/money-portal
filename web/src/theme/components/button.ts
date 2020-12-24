import theme from "@chakra-ui/theme";

export const Button = {
  ...theme.components.Button,
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    _focus: {
      boxShadow: 'none',
    },
  },
  sizes: {
    xs: {
      fontSize: "10px",
      padding: "14px 12px",
    },
    sm: {
      fontSize: "12px",
      padding: "16px 14px",
    },
    md: {
      fontSize: "16px",
      padding: "24px",
    },
  },
  variants: {
    solid: {
    },
    outline: {
      border: "1px solid",
    },
    link: {
      textDecoration: "none",
      border: "none",
    },
  },
  defaultProps: {
    size: "sm",
    variant: "solid",
  },
};

