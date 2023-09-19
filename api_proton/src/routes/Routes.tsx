
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, NovoProjeto, MyProjects, VisualizarProjeto  } from "../pages";



export  const AppRoutes = () =>{
  

    return(
        <Routes>
            <Route path="/home" element={<Home/>}  />

            <Route path="/novoProjeto" element={<NovoProjeto/>}/>
            
            <Route path="/myProjects" element={<MyProjects/>}/>

            <Route path="/visualizarProjeto" element={<VisualizarProjeto/>}/>

            <Route path="*" element={<Navigate to="/home"/>}/>

        </Routes>

    );
};