import { useEffect, useMemo, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ILoginRequest } from "services/typing";
import { useSignIn } from "hooks/auth";
import { authErrorMessages, commonErrorMessage } from "../constants";
import withAlreadyAuth from "hocs/withAlreadyAuth";
import Head from "next/head";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignIn = () => {
  const [signIn, user, loading, error] = useSignIn();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {}, [user]);

  const handleShowClick = () => setShowPassword(!showPassword);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginRequest>();

  const submit = useMemo(() => handleSubmit(signIn), [handleSubmit, signIn]);

  const errorMsg = authErrorMessages[error?.code] || error?.message || commonErrorMessage;

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center">
      <Head>
        <title>Sign In</title>
      </Head>
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box width={["100%", "100%", "320px"]}>
          <form onSubmit={submit}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              {!!error && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMsg}
                </Alert>
              )}
              <FormControl isInvalid={!!errors?.email?.message}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Please enter your email",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    disabled={loading}
                  />
                </InputGroup>
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.password?.message}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Please enter your password",
                    })}
                    disabled={loading}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                disabled={loading}
                isLoading={loading}>
                Sign In
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="/sign-up">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default withAlreadyAuth(SignIn);
