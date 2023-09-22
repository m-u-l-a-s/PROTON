
import "./CardProcessos.css";

export const CardProcesso = (prop: any) => {
    return (
        
        

            <div className="cardProcesso">
                <div className="card">
                    <h2>{prop.name}</h2>
                    <p>{prop.anexo}</p>
                    <h3>{prop.resp}</h3>
                </div>
            </div>

    )
        
};
