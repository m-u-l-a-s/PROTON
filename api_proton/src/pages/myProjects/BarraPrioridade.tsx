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
                setBackgroundColor("yellow");
                break;
            case "AT":
                setBackgroundColor("red");
                break;
            case "CN":
                setBackgroundColor("green");
                break;
            default:
                setBackgroundColor("transparent");
        }
    }, [props.status]);

    return <div className="barra" style={{ backgroundColor }}></div>;
};

export default BarraPrioridade;
