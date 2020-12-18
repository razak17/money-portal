import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

// export const breakpoints = createBreakpoints({
  // sm: "360px",
  // md: "536px",
  // lg: "820px",
  // xl: "1055px",
// });


const theme2 = extendTheme({
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
})

export default theme2
