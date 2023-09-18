import {BrowserRouter} from "react-router-dom"
import { AppRoutes } from "./routes/Routes";
import { AppThemeProvider } from "./shered/contexts";
import { MenuSuperior } from "./shered/components";







 export const  App = () => {
  return (

    <AppThemeProvider>

    

    
    <BrowserRouter>
    
    <MenuSuperior>

    <AppRoutes/>

    </MenuSuperior>


    
    </BrowserRouter>
    
     
   </AppThemeProvider> 
    
  );
}

export default App;
