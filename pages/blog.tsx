import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Image,
  Text,
  Stack,
  Heading,
  useColorModeValue,
  CloseButton,
  Avatar,
} from "@chakra-ui/react";
import BlogItem from "components/blog/BlogItem";
import BlogModal from "components/blog/BlogModal";
import { usePosts } from "hooks/post";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import postService from "services/postService";
import { IPost } from "services/typing";
import { dateFormatter } from "utils/formatter";

interface IProps {
  posts: IPost[];
}

const Blog: React.FC<IProps> = (props) => {
  const { posts: initialPosts } = props;
  const [posts] = usePosts(initialPosts);
  const [selectedPostId, setSelelectedPostId] = useState<string>(null);

  const selectedPost = useMemo(() => posts?.find(({ id }) => id === selectedPostId), [selectedPostId, posts]);

  const handleCloseModal = useCallback(() => {
    setSelelectedPostId(null);
  }, [setSelelectedPostId]);

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <BlogModal data={selectedPost} onModalClose={handleCloseModal} />
      <Box width="100vw" minHeight="100vh" bg="gray.100" display="flex" justifyContent="center">
        <Box w={["100%", "100%", "85%"]} bg="white" boxShadow="lg">
          <Grid templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", sm: "repeat(2, 1fr)" }} gap={6}>
            {posts?.map((post) => (
              <BlogItem key={post?.id} data={post} onItemClick={(data) => setSelelectedPostId(data.id)} />
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await postService.getPosts();
  return {
    props: {
      posts,
    },
  };
};
export default Blog;
