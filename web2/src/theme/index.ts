import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import { styles } from "./styles";

import { colors } from "./colors";
// import { Button } from "./components/Button";
import { breakpoints } from "./breakpoints";

// Foundational style overrides
// import borders from "./foundations/borders"

// Component style overrides
// import Button from "./components/button"

const overrides = {
  styles,
  colors,
  breakpoints,
  // Other foundational style overrides go here
  components: {
    // Button,
    // Other components go here
  },
};

export default extendTheme(overrides);
