import React from "react";
import { Box } from "@chakra-ui/react";
import ImageComponent from "./ImageComponent";
import api from "../helpers/api";
import { ImagesContext } from "../../App";
const Body = () => {
  const { images, setImages } = React.useContext(ImagesContext);
  const getAllImages = async () => {
    const imagesQuery = await api.get("get-all");
    setImages(imagesQuery.data);
  };
  React.useEffect(() => {
    getAllImages();
  }, []);
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection="row"
      margin="auto"
      justifyContent="center"
    >
      {images.length > 0 ? (
        images.map((item) => (
          <ImageComponent
            src={item.url}
            width={item.width}
            height={item.height}
            imageText={item.label}
            key={item._id}
            id={item._id}
          />
        ))
      ) : (
        <h1>Sem registros no banco de dados</h1>
      )}
    </Box>
  );
};

export default Body;
