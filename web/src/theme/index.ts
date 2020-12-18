import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const fontSizes = {
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

const fontWeights = {
  normal: 400,
  medium: 500,
  bold: 700,
}

const borderRadius = createBreakpoints({
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
})

const colors = {
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  brandBlue: {
    // 50: "#262b40",
    50: "#edf0fd",
    100: "#ced3e6",
    200: "#afb5d0",
    300: "#8f98bc",
    400: "#707aa8",
    500: "#57618e",
    600: "#434b6f",
    700: "#303650",
    800: "#1b2032",
    900: "#080b17",
  },
  gray: {
    50: "#f7fafc",
    // ...
    900: "#1a202c",
    // ...
  },
}

const breakpoints = createBreakpoints({
  sm: "360px",
  md: "536px",
  lg: "820px",
  xl: "1055px",
});

// const breakpoints = createBreakpoints({
  // sm: '40em',
  // md: '52em',
  // lg: '64em',
  // xl: '80em',
// })

const theme = {
  colors,
  fonts,
  fontSizes,
  breakpoints,
  borderRadius,
  fontWeights
}

export default extendTheme(theme);
