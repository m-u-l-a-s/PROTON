import {BrowserRouter} from "react-router-dom"
import { AppRoutes } from "./routes/Routes";
import { MenuSuperior } from "./shered/components";

// import { DarkTheme} from "./shered/themes/Dark";
// import { ThemeProvider } from "@emotion/react";
import { AppThemeProvider } from "./shered/contexts/ThemeContexts";






 export const  App = () => {
  return (

   

    <AppThemeProvider>
    
    {/* // <ThemeProvider theme={DarkTheme}> */}

    <BrowserRouter>
    
    <MenuSuperior>

    <AppRoutes/>

    </MenuSuperior>
 
    </BrowserRouter>



    {/* // </ThemeProvider> */}
    
   </AppThemeProvider>
     
  
    
  );
}

export default App;
