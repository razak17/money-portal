import { Flex } from "@chakra-ui/react";
import * as React from "react";
import { Nav } from "./";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <Flex>{children}</Flex>
    </>
  );
};
