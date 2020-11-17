import React, { useState } from "react";
import { SideBar } from "./components/SideBar";
import { Main } from "./components/Main";
import { Nav } from "./components/Nav";
import { Box, Grid } from "@chakra-ui/react";

function App() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggling = () => setIsOpenSideBar(!isOpenSideBar);
  return (
    <>
      <Nav />
      <Box>
        <Grid
          height="92vh"
          templateColumns="250px auto auto"
          templateRows="auto 4fr auto"
          gap={0}
        >
          <SideBar toggling={toggling} isOpen={isOpenSideBar} />
          <Main />
        </Grid>
      </Box>
    </>
  );
}

export default App;
