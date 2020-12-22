import * as React from "react";
import { FILTER_OPTIONS } from "../../constants";
import { ApolloQueryResult } from '@apollo/client';
import { TransactionsQuery } from '../../generated/graphql';
import { Formik, Form } from 'formik';
import { FormikInputField } from '../partials';
import {
  Box,
  Flex,
  Text,
  Select,
} from "@chakra-ui/react";
import { SearchSchema } from '../../utils/validate';

interface TransactionsTableProps {
  limit: number;
  count: number | undefined;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  limitRefetch: (customLimit: number) => Promise<ApolloQueryResult<TransactionsQuery>>
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  searchRefetch: any;
}

export const TransactionsTableEntries: React.FC<TransactionsTableProps> = ({
  count,
  limit,
  setLimit,
  limitRefetch,
  searchRefetch
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  // console.log(searchQuery);

  const options = FILTER_OPTIONS.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  const entries = (
    <Box w={{ base: "100%", md: "60%", lg: "75%", xl: "75%" }} flex="0 auto">
      <Flex flexWrap="wrap" flex="0 0 auto">
        <Box paddingTop={2}>
          <Text>Show</Text>
        </Box>
        <Box p="0 1em 0 1em" flex="0 0 auto">
          <Select
            value={limit}
            fontSize="1em"
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              limitRefetch(parseInt(e.target.value))
            }}
          >
            {[...options]}
          </Select>
        </Box>
        <Box paddingTop={2}>
          <Text>Entries</Text>
        </Box>
      </Flex>
    </Box>
  );

  const search = (
    <Box w={{ base: "100%", sm: "70%", md: "40%", lg: "25%", xl: "25%" }} flex="0 auto">
      <Flex
        p={{ base: "1em 0", md: "0" }}
        ml={{ base: "0", md: "auto" }}
        flexWrap="wrap"
        flex="0 auto"
      >
        <Box pt={2}>
          <Text>Search:</Text>
        </Box>
        <Box p="0 0 0 1em" flex="1">
          <Formik
            initialValues={{
              query: ""
            }}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (values) => {
              console.log(values);
              searchRefetch(values.query)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormikInputField disabled={isSubmitting}  name="query" placeholder="Search here..." />
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Box>
  );

  return (
    count && count > 0 ? (
      <Flex mb="0.5em" flexWrap="wrap" p="0.5em">
        {entries}
        {search}
      </Flex>
    ) : null
  );
};
