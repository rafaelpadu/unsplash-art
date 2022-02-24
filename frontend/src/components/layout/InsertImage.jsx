import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { ImagesContext } from "../../App";
import api from "../helpers/api";
const initialValues = {
  label: "",
  url: "",
  width: 0,
  height: 0,
};
const InsertImage = ({ isOpen, closeModal }) => {
  const [values, setValues] = React.useState(initialValues);
  const [open, setOpen] = React.useState(false);
  const [isErrorLabel, setIsErrorLabel] = React.useState(false);
  const [isErrorLabelText, setIsErrorLabelText] = React.useState(false);
  const [isErrorUrl, setIsErrorUrl] = React.useState(false);
  const [isErrorUrlText, setIsErrorUrlText] = React.useState(false);

  const { setImages } = React.useContext(ImagesContext);

  const getAllImages = async () => {
    const imagesQuery = await api.get("get-all");
    setImages(imagesQuery.data);
  };

  const toast = useToast();

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onClose = () => {
    setValues(initialValues);
    setOpen(false);
    closeModal();
  };

  const getWidthHeight = () => {
    return new Promise((res, rej) => {
      const newImg = new Image();
      newImg.src = values.url;

      newImg.onload = () => {
        res({ width: newImg.width, height: newImg.height });
      };

      newImg.onerror = () => {
        toast({
          title: "Erro ao cadastrar",
          description: "Por favor, verifique a URL!",
          status: "error",
          duration: 4500,
          isClosable: true,
        });
        return false;
      };
    });
  };
  const validateFields = () => {
    let valid = true;
    setIsErrorLabel(false);
    setIsErrorLabelText("");
    setIsErrorUrl(false);
    setIsErrorUrlText("");
    if (!values.label) {
      setIsErrorLabel(true);
      setIsErrorLabelText("This field cannot be blank!");
      valid = false;
    }
    if (!values.url) {
      setIsErrorUrl(true);
      setIsErrorUrlText("This field cannot be blank!");
      valid = false;
    }
    return valid;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    getWidthHeight()
      .then(async (itens) => {
        setValues({ ...values, width: itens.width, height: itens.height });
        let postImg = values;
        postImg.width = itens.width;
        postImg.height = itens.height;
        await api.post("/register", postImg).then((res) => {
          toast({
            title: "Sucesso",
            description: res.data.message,
            status: "success",
            duration: 4500,
            isClosable: true,
          });
          onClose();
        });
        getAllImages();
      })
      .catch((err) => {
        toast({
          title: "Erro ao cadastrar",
          description: err,
          status: "error",
          duration: 4500,
          isClosable: true,
        });
      });
  };
  return (
    <Modal closeOnOverlayClick={false} isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent marginTop="8rem">
        <ModalHeader
          fontFamily="heading"
          color="modalText"
          fontSize="2xl"
          fontWeight={500}
        >
          Add a new photo
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text
            fontFamily="heading"
            fontSize="xl"
            color="modalText"
            fontWeight={500}
          >
            Label
          </Text>
          <Input
            size="lg"
            value={values.label}
            name="label"
            isInvalid={isErrorLabel}
            placeholder={isErrorLabelText}
            onChange={handleChange}
          ></Input>
          <Text
            fontFamily="heading"
            fontSize="xl"
            color="modalText"
            fontWeight={500}
          >
            Photo URL
          </Text>
          <Input
            size="lg"
            value={values.url}
            name="url"
            isInvalid={isErrorUrl}
            placeholder={isErrorUrlText}
            onChange={handleChange}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button
            fontFamily="heading"
            fontSize="sm"
            fontWeight={500}
            variant="link"
            marginRight={6}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            fontFamily="heading"
            fontSize="sm"
            fontWeight={700}
            colorScheme="whatsapp"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InsertImage;
