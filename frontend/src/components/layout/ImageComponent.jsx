import { Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import DeleteImg from "./DeleteImg";

const ImageComponent = ({ src, width, height, imageText, id }) => {
  const [source, setSource] = React.useState(src);
  const [mask, setMask] = React.useState(source);
  const [openMask, setOpenMask] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const onHover = () =>
    setTimeout(() => {
      setOpenMask(true);
      setMask(`linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.8)), url(${source})`);
    }, 120);
  const onHoverOut = () =>
    setTimeout(() => {
      setOpenMask(false);
      setMask(source);
    }, 120);

  return (
    <Box
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
      backgroundImage={mask}
      backgroundSize="cover"
      backgroundPosition="center"
      margin={3}
      borderRadius={24}
      maxW={490}
      maxH={550}
      w={width}
      h={height}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      {openMask && (
        <>
          <Button
            colorScheme="red"
            variant="solid"
            w="80px"
            fontFamily="body"
            fontSize="md"
            borderRadius={24}
            alignSelf="end"
            margin="8px 8px 0 0"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Delete
          </Button>
          <Text
            padding={8}
            fontFamily="body"
            fontSize="md"
            fontWeight={700}
            color="white"
          >
            {imageText}
          </Text>
        </>
      )}
      <DeleteImg
        isOpen={openModal}
        closeModal={() => {
          setOpenModal(false);
          onHoverOut();
        }}
        idImg={id}
      />
    </Box>
  );
};

export default ImageComponent;
