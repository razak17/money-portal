import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  desc: string;
}

export const Feature: React.FC<Props> = ({ title, desc, ...rest }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
};
