import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import App from "./App";
import { ChakraProvider,extendTheme,ColorModeScript } from "@chakra-ui/react";


const config = {initialColorMode: "ligth"}
const theme = extendTheme({config});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    <App />
  </ChakraProvider>
  
);
