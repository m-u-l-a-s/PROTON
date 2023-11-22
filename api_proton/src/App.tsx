import {BrowserRouter, Route} from "react-router-dom"
import { AppRoutes } from "./routes/Routes";
import { MenuSuperior } from "./shared/components";
import { Login } from "./pages/login/Login";

// import { DarkTheme} from "./shared/themes/Dark";
// import { ThemeProvider } from "@emotion/react";
import { AppThemeProvider } from "./shared/contexts/ThemeContexts";
import { useState } from "react";
import { validarEdicao } from "./control/validarEdicao";





 export const  App = () => {
  const isLoginPage = (window.location.pathname === "/login") || (window.location.pathname === "/");
  const isCadastroPage = window.location.pathname === "/cadastro";
  const isResto = !(isLoginPage || isCadastroPage)


  return (

   

    <AppThemeProvider>
    
    {/* // <ThemeProvider theme={DarkTheme}> */}

    <BrowserRouter>
    
    {isLoginPage && (
    <MenuSuperior hideHome={true} hideProcesses={true} hideDocuments={true} showCombo={false}>


    <AppRoutes/>

    </MenuSuperior>

    )}

{isResto && (
    <MenuSuperior hideHome={false} hideProcesses={false} hideDocuments={false} showCombo={true}>


    <AppRoutes/>

    </MenuSuperior>

    )}

    {isCadastroPage && (
      <MenuSuperior
      hideHome={true} hideProcesses={true} hideDocuments={true} showCombo={true}>

      <AppRoutes />

      </MenuSuperior>

    )}

    {/* {!isLoginPage && !isCadastroPage && <AppRoutes />} */}
 
    </BrowserRouter>

    



    {/* // </ThemeProvider> */}
    
   </AppThemeProvider>
     
  
    
  );
}

export default App;
