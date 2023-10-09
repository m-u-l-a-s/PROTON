import { InputLabel, MenuItem, Select } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";



export const ComboResponsavel = (prop: any) => {

    const [usuario, setUsuario] = useState([{
        usuario_id: 1,
        usuario_nome: "Betrano",
        usuario_senha: "senha123",
        usuario_data_cadastro: new Date(),
        usuario_nivel: 'CL',
        usuario_email: "betrano@gmail.com"
    },
    {
        usuario_id: 2,
        usuario_nome: "Fulano",
        usuario_senha: "senha456",
        usuario_data_cadastro: new Date(),
        usuario_nivel: 'LE',
        usuario_email: "fulano@gmail.com"
    }]);


    const get_usuario = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/get_usuario/"
            );
            const jsonData = await response.json();
            setUsuario(jsonData); // Update the state with fetched data
        } catch (error: any) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        get_usuario();
    }, []);
    return (

        <> <InputLabel id="responsavel-label">Responsável</InputLabel>
        <Select labelId="responsavel-label" id="responsavel" value={(0)} /* Substitua 1 pelo valor adequado */>
        {usuario.map((usuarioItem) => (
                                            <MenuItem  value={(usuarioItem.usuario_id)}>{usuarioItem.usuario_nome}</MenuItem>
                                        ))}
        </Select></>
    )
}

