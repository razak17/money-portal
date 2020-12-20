import theme  from "@chakra-ui/theme";

export const fonts = {
  ...theme.fonts,
  body: `"Source Sans Pro",${theme.fonts.body}`,
  heading: `"Source Sans Pro",${theme.fonts.heading}`,
}

export const fontSizes = {
  ...theme.fontSizes,
  xs: "10px",
  sm: "12px",
  md: "14px",
  lg: "16px",
  xl: "18px",
  "2xl": "22px",
  "3xl": "26px",
  "4xl": "36px",
  "5xl": "48px",
  "6xl": "64px",
}

export const fontWeights = {
  ...theme.fontWeights,
  medium: 500,
  semiBold: 500,
  bold: 700,
}


