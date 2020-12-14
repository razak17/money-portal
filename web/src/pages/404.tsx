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
        {data?.me ? (
          <Button size="lg" onClick={() => history.push(AuthRoutes.DASHBOARD)}>
            Back to dashboard
          </Button>
        ) : (
          <Button size="lg" onClick={() => history.push(NonAuthRoutes.LOGIN)}>
            Back to login page
          </Button>
        )}
      </Box>
    </Wrapper>
  );
};
