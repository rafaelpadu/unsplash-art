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

const DeleteImg = ({ isOpen, closeModal, idImg }) => {
  const [open, setOpen] = React.useState(false);
  const [pswd, setPswd] = React.useState("");
  const [error, setError] = React.useState(false);
  const { setImages } = React.useContext(ImagesContext);

  const toast = useToast();
  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const onClose = () => {
    setOpen(false);
    closeModal();
  };

  const onSubmit = async () => {
    setError(false);
    if (!pswd.match("password")) {
      setError(true);
      setPswd("");
      return;
    } else {
      await api
        .delete(`/delete/${idImg}`)
        .then((res) => {
          toast({
            title: "Image deleted",
            description: res.data.message,
            status: "success",
            duration: 4500,
            isClosable: true,
          });
          getAllImages();
          onClose();
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: err,
            status: "error",
            duration: 4500,
            isClosable: true,
          });
          onClose();
        });
    }
  };
  const getAllImages = async () => {
    const itens = await api.get("/get-all");
    setImages(itens.data);
  };
  return (
    <Modal onClose={onClose} isOpen={open}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontFamily="heading"
          color="modalText"
          fontSize="2xl"
          fontWeight={500}
        >
          Are you sure?
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form autoComplete="off">
            <Text
              fontFamily="heading"
              fontSize="xl"
              color="modalText"
              fontWeight={500}
            >
              Type "password":
            </Text>
            <Input
              size="lg"
              isInvalid={error}
              placeholder={error ? "Please type the word correctly" : ""}
              autoComplete="off"
              value={pswd}
              type="password"
              onChange={(e) => setPswd(e.target.value)}
            />
          </form>
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
            colorScheme="red"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteImg;
