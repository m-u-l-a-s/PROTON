import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BarraPrioridade.css";

const BarraPrioridade = (props: { status: string }) => {
    const navigate = useNavigate();
    const [backgroundColor, setBackgroundColor] = useState<string>("");

    useEffect(() => {
        switch (props.status) {
            case "NI":
                setBackgroundColor("transparent");
                break;
            case "EA":
                setBackgroundColor("#FFD15C");
                break;
            case "AT":
                setBackgroundColor("#FF7058");
                break;
            case "CN":
                setBackgroundColor("#5DC474");
                break;
            default:
                setBackgroundColor("transparent");
        }
    }, [props.status]);

    return <div className="barra" style={{ backgroundColor }}></div>;
};

export default BarraPrioridade;
