import Head from "next/head";
import DynamicText from "components/DynamicText";
import { Input, Box } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import CurrentUser from "components/CurrentUser";
import withAuth from "hocs/withAuth";

const Home = () => {
  const dynamicTextRef = useRef<{ changeValue: (value: string) => void }>();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current?.changeValue(e.target.value);
  }, []);

  return (
    <Box
      minH="100vh"
      flexDirection="column"
      p="0 0.5rem"
      flex={1}
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        as="main"
        p="5rem 0"
        flex={1}
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center">
        <CurrentUser />
        <DynamicText ref={dynamicTextRef} />
        <Input onChange={onChange} w={"300px"} />
      </Box>
    </Box>
  );
};

export default withAuth(Home);
