import React from "react";
import "./CardProcessos.css";
import { useNavigate } from "react-router-dom";
import BarraPrioridade from "./BarraPrioridade";

const verificaStatus = () => {
    return "CN";
};

export const CardProcesso = (prop: any) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/visualizarProjeto", { state: { id: prop.processoID } });
    };

    return (
        <>
            <div onClick={handleClick} className="cardProcesso">
                <BarraPrioridade status={verificaStatus()} />
                <div className="card">
                    <h2>{prop.name}</h2>
                    <h3>{prop.resp}</h3>
                </div>
            </div>
        </>
    );
};



