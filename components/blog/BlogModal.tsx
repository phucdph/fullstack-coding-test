import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  ModalCloseButton,
  ModalBody,
  Stack,
  Heading,
  useColorModeValue,
  Avatar,
  Image,
  Text,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";
import { IPost } from "services/typing";
import { dateFormatter } from "utils/formatter";

interface IProps {
  data?: IPost;
  onModalClose?: () => void;
}

const BlogModal: React.FC<IProps> = (props) => {
  const { data: selectedPost, onModalClose } = props;
  return (
    <Modal isOpen={!!selectedPost} onClose={onModalClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <Box position="absolute" top={-3} right={0} width={50} height={50} zIndex={2}>
          <ModalCloseButton bg="white" />
        </Box>
        <ModalBody>
          <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
            <Image src={selectedPost?.image} fit="cover" width="100%" height="100%" />
          </Box>
          <Stack my={3}>
            <Heading color={useColorModeValue("gray.700", "white")} fontSize={"2xl"} fontFamily={"body"}>
              {selectedPost?.title}
            </Heading>
            <Text color={"gray.500"}>{selectedPost?.description}</Text>
            <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
              <Avatar src={selectedPost?.owner?.avatar} />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>{selectedPost?.owner?.name}</Text>
                <Text color={"gray.500"}>
                  {dateFormatter(selectedPost?.created_at)} · {selectedPost?.est_reading_time} min read
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Box dangerouslySetInnerHTML={{ __html: selectedPost?.content }}></Box>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" onClick={onModalClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BlogModal;
