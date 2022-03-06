import React, { CSSProperties } from "react";
import { Spinner } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react";

interface IProps {
  loading?: boolean;
  style?: CSSProperties;
}

const PageLoading = (props: IProps) => {
  const { loading = false, ...rest } = props;
  if (!loading) return null;
  return (
    <Box
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      {...rest}
    >
      <Spinner />
    </Box>
  );
};

export default PageLoading;
