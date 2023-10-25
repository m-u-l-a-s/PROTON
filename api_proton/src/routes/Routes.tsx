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
import FormInput from "../pages/signup/FormInput";
import Cadastro from "../pages/signup/Cadastro";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />

            <Route path="/novoProjeto" element={<NovoProjeto />} />

            <Route path="/myProjects" element={<MyProjects />} />

            <Route path="/visualizarProjeto" element={<VisualizarProjeto />} />

            <Route path="/Anexos" element={<Anexos />} />

            <Route path="*" element={<Navigate to="/home" />} />

            <Route path="/NovaEtapa" element={<NovaEtapa />} />

            <Route path="/DetalheEtapa" element={<DetalheEtapa />} />

            <Route path="/Cadastro" element={<Cadastro />} />
        </Routes>
    );
};
