import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BarraStatus.css";

const BarraStatus = (props: { status: string }) => {
    const navigate = useNavigate();
    const [backgroundColor, setBackgroundColor] = useState<string>("");

    useEffect(() => {

        const P = "Pendente";
        const A = "Em aprovação"
        const C = "Concluído"

        switch (props.status) {
            case A:
                setBackgroundColor("#FFD15C");
                break;
            case P:
                setBackgroundColor("#FF7058");
                break;
            case C:
                setBackgroundColor("#5DC474");
                break;
            default:
                setBackgroundColor("transparent");
        }
    }, [props.status]);

    return <div className="barraStatus" style={{ backgroundColor }}></div>;
};

export default BarraStatus;
