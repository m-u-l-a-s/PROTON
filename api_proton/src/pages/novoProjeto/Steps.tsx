
import "./Steps.css"
import {useNavigate} from 'react-router-dom'

export const Steps = (prop:any) => {

    const navigate = useNavigate();

    const handleClick = () => {
                navigate('/DetalheEtapa',{state:{id:prop.etapa_id}});
            }
    

return(
    <div  onClick={handleClick} className="cardEtapa">
        <div className="top-row">
            <div className="etapa">{prop.nEtapa}</div>
            <div className="pendente">{prop.status}</div>
        </div>
        <div className="descricao"> {prop.desc}</div>
    </div>  
)


}