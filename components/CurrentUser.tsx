import { Avatar, Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "./AuthProvider/hooks";
import { Text } from "@chakra-ui/react";
import { useSignOut } from "hooks/auth";

interface IProps {}

const CurrentUser: React.FC<IProps> = () => {
  const [user] = useAuth();
  const [signOut, loading] = useSignOut();
  return (
    <Box display="flex" p={3} bg={"gray.100"} alignItems="center" my={2}>
      <Avatar src={user?.photoURL} size="sm" />
      <Text as="b" style={{ marginLeft: 8, marginRight: 8 }}>
        {user?.email}
      </Text>
      <Button colorScheme="red" size="sm" disabled={loading} isLoading={loading} onClick={signOut}>
        Logout
      </Button>
    </Box>
  );
};

export default CurrentUser;
