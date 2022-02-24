import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React from "react";
import { ImagesContext } from "../../App";
import Person from "../../assets/person.png";
import SearchIcon from "../../assets/search-icon.svg";
import api from "../helpers/api";
import InsertImage from "./InsertImage";
const Header = () => {
  const [searchField, setSearchField] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const { setImages } = React.useContext(ImagesContext);

  const debounceSearch = React.useCallback(
    debounce((val) => getAllImages(val), 1000),
    []
  );

  const getAllImages = async (val) => {
    let imagesQuery = null;
    if (val === "") {
      imagesQuery = await api.get("/get-all");
    } else {
      imagesQuery = await api.get(`/get-image/${val}`);
    }
    setImages(imagesQuery.data);
  };
  const handleChange = (e) => {
    setSearchField(e.target.value);
    debounceSearch(e.target.value);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      padding={4}
      justifyContent="space-between"
    >
      <Box display={"flex"}>
        <Box display={"flex"} alignItems="center" margin={"0 3rem"}>
          <Image src={Person} alt="Person Avatar" w={"2rem"} margin={3} />
          <button
            onClick={() => {
              setSearchField("");
              getAllImages("");
            }}
          >
            <Box>
              <Text
                as="h1"
                fontWeight={"bold"}
                fontSize="large"
                fontFamily="heading"
              >
                My Unsplash
              </Text>
              <Text as="p" fontFamily="heading" fontSize={"small"}>
                devchallenges.io
              </Text>
            </Box>
          </button>
        </Box>
        <InputGroup marginRight="15rem" w="auto">
          <InputLeftElement
            h="100%"
            children={
              <img
                src={SearchIcon}
                alt="Search Icon"
                style={{ width: "35px", paddingLeft: "11px" }}
              />
            }
          />
          <Input
            placeholder="Search by name"
            padding="0 47px"
            maxWidth={300}
            value={searchField}
            onChange={handleChange}
            type="text"
            h={55}
            borderRadius={"xl"}
            autoComplete="off"
          />
        </InputGroup>
      </Box>
      <Button
        marginRight={"6rem"}
        bg="addButton"
        fontFamily="heading"
        fontWeight="bold"
        fontSize="large"
        colorScheme="whatsapp"
        variant="solid"
        color="white"
        onClick={() => setOpenModal(true)}
      >
        Add a photo
      </Button>
      <InsertImage isOpen={openModal} closeModal={() => setOpenModal(false)} />
    </Box>
  );
};

export default Header;
