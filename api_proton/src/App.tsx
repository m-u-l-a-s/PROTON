import {BrowserRouter} from "react-router-dom"
import { AppRoutes } from "./routes/Routes";
import { MenuSuperior } from "./shared/components";

// import { DarkTheme} from "./shared/themes/Dark";
// import { ThemeProvider } from "@emotion/react";
import { AppThemeProvider } from "./shared/contexts/ThemeContexts";






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
