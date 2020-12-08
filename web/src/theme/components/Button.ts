export const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
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
      border: "2px solid",
      borderColor: "green.500",
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
};
