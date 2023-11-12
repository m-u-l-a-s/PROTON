import { Routes, Route, Navigate } from "react-router-dom";
import {
    Home,
    NovoProjeto,
    MyProjects,
    Anexos,
    NovaEtapa,
    DetalheEtapa,
} from "../pages";
import VisualizarProjeto from "../pages/visualizarProjeto/VisualizarProjeto";
import { Cadastro } from "../pages/cadastro/Cadastro";
import { Login } from "../pages/login/Login";
export const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Login />
                    // <Navigate to= "/Login" />
                }
            />

            <Route path="/home" element={<Home />} />

            <Route path="/novoProjeto" element={<NovoProjeto />} />

            <Route path="/myProjects" element={<MyProjects />} />

            <Route path="/visualizarProjeto" element={<VisualizarProjeto />} />

            <Route path="/Anexos" element={<Anexos />} />

            <Route path="/Login" element={<Login />} />

            <Route path="/NovaEtapa" element={<NovaEtapa />} />

            <Route path="/DetalheEtapa" element={<DetalheEtapa />} />

            <Route path="/Cadastro" element={<Cadastro />} />
        </Routes>
    );
};
