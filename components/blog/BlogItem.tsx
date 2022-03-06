import { Avatar, Box, Center, Heading, Stack, useColorModeValue, Image, Text, Img } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { IPost } from "services/typing";
import { dateFormatter } from "utils/formatter";

interface IProps {
  data?: IPost;
  onItemClick?: (data: IPost) => void;
}

const BlogItem: React.FC<IProps> = (props) => {
  const { data, onItemClick } = props;
  const handleItemClick = useCallback(() => {
    onItemClick && onItemClick(data);
  }, [onItemClick, data]);
  return (
    <Center onClick={handleItemClick} cursor="pointer">
      <Box
        maxW={"400px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"lg"}
        h="full"
        rounded={"md"}
        p={6}
        overflow={"hidden"}>
        <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <Img src={data?.image} objectFit="cover" width="100%" height="100%" />
        </Box>
        <Stack>
          <Text color={"green.500"} textTransform={"uppercase"} fontWeight={800} fontSize={"sm"} letterSpacing={1.1}>
            Blog
          </Text>
          <Heading color={useColorModeValue("gray.700", "white")} fontSize={"2xl"} fontFamily={"body"}>
            {data?.title}
          </Heading>
          <Text color={"gray.500"}>{data?.description}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar src={data?.owner?.avatar} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{data?.owner?.name}</Text>
            <Text color={"gray.500"}>
              {dateFormatter(data?.created_at)} · {data?.est_reading_time} min read
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default React.memo(BlogItem);
