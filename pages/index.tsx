import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "../components/DynamicText";
import { Input, Box } from "@chakra-ui/react";
import { useCallback, useRef } from "react";

const Home = () => {
  const dynamicTextRef = useRef<{ changeValue: (value: string) => void }>();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current?.changeValue(e.target.value);
  }, []);

  return (
    <Box className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DynamicText ref={dynamicTextRef} />
        <Input onChange={onChange} />
      </main>
    </Box>
  );
};

export default Home;
