import Body from "./components/layout/Body";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "./components/layout/theme";
import React from "react";

export const ImagesContext = React.createContext({
  images: [],
  setImages: () => {},
});
function App() {
  const [images, setImages] = React.useState([]);
  const value = React.useMemo(() => ({ images, setImages }), [images]);
  return (
    <ChakraProvider theme={theme}>
      <ImagesContext.Provider value={value}>
        <Header />
        <Body />
        <Footer />
      </ImagesContext.Provider>
    </ChakraProvider>
  );
}

export default App;
