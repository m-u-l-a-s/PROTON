import React, { useEffect, useState } from "react";
import "./CardProcessos.css";
import { useNavigate } from "react-router-dom";
import BarraPrioridade from "./BarraPrioridade";



const verificaStatus = async (processId: any) => {
    try {
        // Buscar todas as etapas do processo:
        const etapasResponse = await fetch(
            `http://localhost:5000/get_etapa_by_processo/${processId}`
        );
        if (!etapasResponse.ok) {
            throw new Error("Não foi possível buscar etapas.");
        }

        // Converter resposta em JSON:
        const etapas = await etapasResponse.json();

        let temAnexos = false;
        let temAnexosEmAtraso = false;
        let todasEtapasValidadas = false;
        let etapasValidadas = 0;

        for (const etapa of etapas) {
            const anexosResponse = await fetch(
                `http://localhost:5000/get_anexos_by_etapa/${etapa.etapa_id}`
            );
            if (!anexosResponse.ok) {
                throw new Error("Erro ao buscar anexos.");
            }
            const anexosData = await anexosResponse.json();

            if (anexosData.contador !== "0") {
                temAnexos = true;
            }

            const etapaDataConclusao = new Date(etapa.etapa_data_conclusao);
            const hoje = new Date();

            if (etapaDataConclusao < hoje) {
                temAnexosEmAtraso = true;
            } else {
            }

            if (etapa.etapa_status === "C") {
                etapasValidadas++;
            }

            if (etapas.length <= etapasValidadas) {
                todasEtapasValidadas = true;
            }
        }

        if (todasEtapasValidadas) {
            return "CN";
        }
        if (temAnexosEmAtraso) {
            return "AT";
        }
        if (temAnexos) {
            return "EA";
        }
        return "NI";
    } catch (error) {
        console.error("Error in verificaStatus:", error);
        return "NI";
    }
};

export const CardProcesso = (prop: any) => {
    const [status, setStatus] = useState("NI");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/visualizarProjeto", { state: { id: prop.processoID } });
    };

    useEffect(() => {
        // Fetch and set the status when the component mounts
        verificaStatus(prop.processoID).then((result) => {
            setStatus(result);
        });
        ContarEtapas();
    }, [prop.processoID]);

    //Contando etapas
    const [ContarEtapasP, setContarEtapa] = useState(0); 
    const ContarEtapas = async () => {
        try {
            const contarEtapas = await fetch(
                `http://localhost:5000/get_numeroEtapa/${prop.processoID}`
            );
            const contarEtapasP = await contarEtapas.json();
            setContarEtapa(contarEtapasP);
        } catch (error) {
            console.error("Erro ao buscar o número de etapas:", error);
        }
    };
    
    return(
    <div onClick={handleClick} className="cardProcesso">
    <BarraPrioridade status={status} />
    <div className="card">
        <h2>{prop.name}</h2>
        <h3>Número de etapas: {ContarEtapasP}</h3>
        <h3>{prop.resp}</h3>
    </div>
    </div>
    );
};

