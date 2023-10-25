import "./Steps.css"
import { useNavigate } from 'react-router-dom'
import { Icon, colors } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";

export const Steps = (prop: any) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/DetalheEtapa', { state: { id: prop.etapa_id } });
    }

    return (
        <div onClick={handleClick} className="cardEtapa">
            <div className="top-row">
                <div className="etapa">{prop.nEtapa}</div>
                <div className="pendente">{prop.status}</div>
            </div>
            <div className="bottom-row">
                <div className="descricao"> {prop.desc}</div>
                <div className="anexados">
                    <Icon>
                        <AttachmentIcon  style={{color: "white"}}/>
                    </Icon>
                    {prop.contadorAnexos} doc. anexados.
                </div>
            </div>
        </div>
    );
}
