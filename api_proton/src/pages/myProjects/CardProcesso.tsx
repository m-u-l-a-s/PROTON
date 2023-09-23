import "./CardProcessos.css";
import { useNavigate } from "react-router-dom";

export const CardProcesso = (prop: any, ) => {

    let  AuxID:number = 2
    const navigate = useNavigate();

    const handleClick = () => {
                navigate("/visualizarProjeto", {state:{id:AuxID}});  
            }
    
    return (

            <div onClick={handleClick} className="cardProcesso">
                <div className="card">
                    <h2>{prop.name}</h2>
                    <p>{prop.anexo}</p>
                    <h3>{prop.resp}</h3>
                </div>
            </div>
    )     
};
