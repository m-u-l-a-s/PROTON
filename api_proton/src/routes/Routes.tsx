
import { Routes, Route, Navigate } from "react-router-dom";
// import { useAppThemeContext } from "../shered/contexts";
import { Home, NovoProjeto, MyProjects  } from "../pages";



export  const AppRoutes = () =>{
    // const {toggleTheme} = useAppThemeContext();

    return(
        <Routes>
            <Route path="/home" element={<Home/>}  />

            <Route path="/novoProjeto" element={<NovoProjeto/>}/>
            
            <Route path="/myProjects" element={<MyProjects/>}/>


            <Route path="*" element={<Navigate to="/home"/>}/>

        </Routes>

    );
};