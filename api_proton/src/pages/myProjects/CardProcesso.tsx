
import "./CardProcessos.css";

export const CardProcesso = (prop: any) => {
    return (
        
        

            <div className="cardProcesso">
                <div className="card">
                    <h1>{prop.name}</h1>
                    <p>{prop.anexo}</p>
                    <h2>{prop.resp}</h2>
                </div>
            </div>

    )
        
};
