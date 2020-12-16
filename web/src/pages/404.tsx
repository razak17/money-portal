import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useMeQuery } from "../generated/graphql";
import { Wrapper, LoadingSpinner } from "../components/partials";
import { useHistory } from "react-router-dom";
import { AuthRoutes, NonAuthRoutes } from "../api/routes";

interface Props {}

export const NotFoundPage: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const history = useHistory();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Wrapper center>
      <Box>
        <Text fontSize="3xl">404 | That page does not exist!</Text>
      </Box>
      <Box mt={4}>
        <Button mr={4} size="lg" onClick={() => history.goBack()}>
          Go Back
        </Button>
        {data?.me ? (
          <Button size="lg" onClick={() => history.push(AuthRoutes.DASHBOARD)}>
            Go to dashboard
          </Button>
        ) : (
          <Button size="lg" onClick={() => history.push(NonAuthRoutes.LOGIN)}>
            Go to login page
          </Button>
        )}
      </Box>
    </Wrapper>
  );
};
