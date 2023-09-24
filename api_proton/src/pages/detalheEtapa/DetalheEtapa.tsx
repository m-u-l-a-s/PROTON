import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
    Box,
    Button,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BarraEtapa } from "../../shared/components";
import { CalendarioEtapa } from "./Calendario";
import "./Style.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";

export const DetalheEtapa = () => {
    const navigate = useNavigate();

    const handleNavigateToProcesso = () => {
        navigate("/visualizarProjeto", { state: { id: etapa.processo_id } });
    };

    const theme = useTheme();
    const location = useLocation();

    const [etapa, setEtapa] = useState({
        etapa_id: 1,
        processo_id: 1,
        etapa_nome: "nome mocado",
        etapa_responsavel_id: 1,
        etapa_ordem: 1,
        etapa_data_conclusão: new Date(),
        etapa_descricao: "descrição mocada",
        etapa_status: "N",
        etapa_comentario: "comentário mocado",
    });

    //[] como segundo argumento impede de fazer request 24/7, fazendo apenas uma request
    useEffect(() => {
        const get_etapa_by_id = async () => {
            //Puxando ID da tela anterior
            // console.log(location.state.id)
            const n = location.state.id;
            const idPag = n.toString();
            try {
                const response = await fetch(
                    "http://localhost:5000/get_etapa/" + idPag
                );
                const jsonData = await response.json();
                setEtapa(jsonData); // Update the state with fetched data
                console.log("JSON: ");
                console.log(jsonData);
                console.log("Etapa: ");
                console.log(etapa);
            } catch (error: any) {
                console.log(error.message);
            }
        };

        get_etapa_by_id(); // Call the function inside useEffect

        // You can now safely use the updated 'etapa' state here
    }, []);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            maxHeight="100vh"
            flexDirection="column"
            sx={{ gap: 3 }}
        >
            <Paper
                sx={{
                    mt: 3,
                    padding: 3,
                    borderRadius: 5,
                    width: "1000px",
                    height: "480px",
                    gap: 3,
                }}>
                    <BarraEtapa etapa_nome = {etapa.etapa_nome}/>


                    {/*</BarraEtapa>*/}

                <Box
                    display="inline-block"
                    alignItems="center"
                    maxHeight="100vh"
                    flexDirection="column"
                >
                    <Box
                        display="inline-block"
                        flexDirection="column"
                        sx={{ gap: 3 }}
                        textAlign={"left"}
                    >
                        <div className="div1">
                            <Grid
                                item
                                margin={"15px"}
                                marginBottom={"40px"}
                                marginTop={"30px"}
                            >
                                <TextField
                                    id="descrição"
                                    label="Descrição"
                                    variant="standard"
                                    sx={{ width: "24vw" }}
                                    value={etapa.etapa_descricao}
                                />
                            </Grid>

                            <Grid margin={"15px"}>
                                <CalendarioEtapa />
                            </Grid>

                            <Grid margin={"15px"}>
                                <TextField
                                    id="standard-multiline-static-responsavel"
                                    label="Responsável:*"
                                    variant="standard"
                                    value={etapa.etapa_responsavel_id}
                                    sx={{
                                        width: "20vw",
                                        borderBottom: "none",
                                        marginRight: "16px",
                                    }}
                                />
                            </Grid>

                            <Grid item sx={{ mt: "8em", marginLeft: "1em" }}>
                                <IconButton
                                    className="meuBotao"
                                    onClick={handleNavigateToProcesso}
                                >
                                    <ArrowBackRoundedIcon />
                                </IconButton>
                            </Grid>
                        </div>

                        <div className="div2">
                            <Grid
                                item
                                margin={"15px"}
                                marginLeft={"100px"}
                                marginTop={"30px"}
                            >
                                <TextField
                                    id="comentario"
                                    label="Deixe um comentário"
                                    variant="standard"
                                    sx={{ width: "24vw" }}
                                    value={etapa.etapa_comentario}
                                />
                            </Grid>
                        </div>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};
