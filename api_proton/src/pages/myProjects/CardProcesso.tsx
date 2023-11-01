import React, { useEffect, useState } from "react";
import "./CardProcessos.css";
import { useNavigate } from "react-router-dom";
import BarraPrioridade from "./BarraPrioridade";

export const CardProcesso = (prop: any) => {

    // Contar Etapas
    const [ContarEtapasP, setContarEtapa] = useState(0); 
    const ContarEtapas = async () => {
        try {
            console.log(prop.processoID)
            const processo_id = prop.processoID;
            const contarEtapas = await fetch(
                `http://localhost:5000/get_numeroEtapa/${processo_id}`
            );
            const contarEtapasP = await contarEtapas.json();
            setContarEtapa(contarEtapasP);
        } catch (error) {
            console.error("Erro ao buscar o número de etapas:", error);
        }
    };

    useEffect(() => {
        ContarEtapas();
    }, []);


    const verificaStatus = () => {
        return "CN";
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/visualizarProjeto", { state: { id: prop.processoID } });
    };

    return (
        <div onClick={handleClick} className="cardProcesso">
            <BarraPrioridade status={verificaStatus()} />
            <div className="card" style={{ fontFamily: 'poppins', fontSize: '0.8em' }}>
                <h2>{prop.name}</h2>
                {ContarEtapasP}
                <h3>{prop.resp}</h3>
            </div>
        </div>
    );
};