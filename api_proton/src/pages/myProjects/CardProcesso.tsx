import React, { useEffect, useState } from "react";
import "./CardProcessos.css";
import { useNavigate } from "react-router-dom";
import BarraPrioridade from "./BarraPrioridade";
import { BaseURL } from "../../control/BaseURL";


const verificaStatus = async (processId: any) => {
    try {
        // Buscar todas as etapas do processo:
        const etapasResponse = await fetch(
            `${BaseURL()}/get_etapa_by_processo/${processId}`
        );
        if (!etapasResponse.ok) {
            throw new Error("Não foi possível buscar etapas.");
        }

        // Converter resposta em JSON:
        const etapas = await etapasResponse.json();

        // console.log("Todas as Etapas: ")
        // console.log(etapas)

        let temAnexos = false;
        let temEtapasEmAtraso = false;
        let todasEtapasValidadas = false;
        let etapasValidadas = 0;

        for (const etapa of etapas) {
            // console.log(etapa)
            const anexosResponse = await fetch(
                `${BaseURL()}/get_anexos_by_etapa/${etapa.etapa_id}`
            );
            if (!anexosResponse.ok) {
                throw new Error("Erro ao buscar anexos.");
            }
            const anexosData = await anexosResponse.json();

            if (anexosData.contador !== "0") {
                temAnexos = true;
            }

            const etapaDataConclusao = new Date(etapa.etapa_data_conclusao);
            // console.log("Data de conclusão: " + etapa.etapa_nome)
            // console.log(etapaDataConclusao)
            const hoje = new Date();

            if (etapaDataConclusao < hoje) {
                temEtapasEmAtraso = true;
            } else {
            }

            if (etapa.etapa_status === "C") {
                etapasValidadas++;
            }

            if (etapas.length <= etapasValidadas) {
                todasEtapasValidadas = true;
            }
        }

        if (etapas.length == 0 ) {
            return "NI"
        }

        if (todasEtapasValidadas) {
            return "CN";
        }
        if (temEtapasEmAtraso) {
            return "AT";
        }
        if (etapas.length > 0) {
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
                `${BaseURL()}/get_numeroEtapa/${prop.processoID}`
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
    <div className="card" style={{fontFamily: 'poppins', fontSize:'0.8em'}}>
        <h2>{prop.name}</h2>
        {ContarEtapasP} etapas
        <h3>{prop.resp}</h3>
    </div>
    </div>
    );
};

