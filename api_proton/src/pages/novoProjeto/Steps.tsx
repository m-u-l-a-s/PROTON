import "./Steps.css"
import { useNavigate } from 'react-router-dom'
import { Icon } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import BarraStatus from "./BarraStatus";
import { useState } from "react";

export const Steps = (prop: any) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/DetalheEtapa', { state: { id: prop.etapa_id, responsavel: prop.processo_responsavel_id } });
    }

    return (
        <div onClick={handleClick} className="cardEtapa">
            <div>
                <BarraStatus status={prop.status}></BarraStatus>
            </div>
            <div className="top-row">
                <div className="etapa" style={{ fontSize: '1.1em' }}>{prop.nEtapa}</div>
                <div className="pendente" style={{ fontSize: '1em' }}>{prop.status}</div>
            </div>
            <div className="bottom-row">
                <div className="descricao" style={{ fontSize: '1em' }}> {prop.desc}</div>
                <div className="anexados" style={{ fontSize: '0.9em' }}>
                    <Icon>
                        <AttachmentIcon />
                    </Icon>
                    {prop.contadorAnexos} doc. anexados.
                </div>
            </div>
        </div>
    );
}
