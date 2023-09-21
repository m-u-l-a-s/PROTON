
import { Grid } from "@mui/material"
import "./Steps.css"

export const Steps = (prop:any) => {

return(
    
    
    <div className="cardEtapa">
        <div className="top-row">
            <div className="etapa">{prop.nEtapa}</div>
            <div className="pendente">{prop.status}</div>
        </div>
        <div className="descricao"> {prop.desc}</div>
    </div>

    
    
)


}