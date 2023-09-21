
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, NovoProjeto, MyProjects, VisualizarProjeto, Anexos, NovaEtapa  } from "../pages";



export  const AppRoutes = () =>{
  

    return(
        <Routes>
            <Route path="/home" element={<Home/>}  />

            <Route path="/novoProjeto" element={<NovoProjeto/>}/>
            
            <Route path="/myProjects" element={<MyProjects/>}/>

            <Route path="/visualizarProjeto" element={<VisualizarProjeto/>}/>

            <Route path="/Anexos" element={<Anexos/>}/>

            <Route path="*" element={<Navigate to="/home"/>}/>

            <Route path="/NovaEtapa" element={<NovaEtapa/>}  />

        </Routes>

    );
};