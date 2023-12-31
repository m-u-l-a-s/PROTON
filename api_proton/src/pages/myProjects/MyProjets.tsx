import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CardProcesso } from "./CardProcesso";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BasicSelect from "./BasicSelect";
import { validarEdicao } from "../../control/validarEdicao";
import { BaseURL } from "../../control/BaseURL";

export const MyProjects = () => {
    const [processos, setProcesso] = useState([
        {
            processo_id: 0,
            processo_nome: "",
            processo_descricao: "",
            processo_responsavel_id: 0,
            processo_responsavel_nome: "",
        }
    ]);

    const get_processos = async () => {
        const perfilJSON: any = sessionStorage.getItem('perfil')
        const id = JSON.parse(JSON.parse(perfilJSON)).usuario_id
        const nivel = JSON.parse(JSON.parse(perfilJSON)).usuario_nivel
        if (nivel === 'AD'){
            try {
                //const response = await fetch (`${BaseURL()}/get_processos_responsavel/${id}`);
                const response = await fetch(`${BaseURL()}/get_processos`);
                const jsonData = await response.json();
    
                // console.log(jsonData)
                setProcesso(jsonData);
                // console.log(processos)
            } catch (error: any) {
                console.log(error.message);
            }
        }
        else{
            try {
                const response = await fetch (`${BaseURL()}/get_processos_responsavel/${id}`);
                //const response = await fetch("${BaseURL()}/get_processos");
                const jsonData = await response.json();

                // console.log(jsonData)
                setProcesso(jsonData);
                // console.log(processos)
            } catch (error: any) {
                console.log(error.message);
            }
        }  
    };

    //[] como segundo argumento impede de fazer request 24/7, fazendo apenas uma request
    useEffect(() => {
        get_processos();
    }, []);

    //Puxando nome do responsavel

    const get_processos_responsavelNome = async () => {
        const perfilJSON: any = sessionStorage.getItem('perfil');
        const id = JSON.parse(JSON.parse(perfilJSON)).usuario_id;
        const nivel = JSON.parse(JSON.parse(perfilJSON)).usuario_nivel;
        if (nivel==='AD'){
            try {
                const response = await fetch(
                    `${BaseURL()}/get_processos_responsavelNome`
                );
                const jsonData = await response.json();
    
                // console.log(jsonData)
                setProcesso(jsonData);
                // console.log(processos)
            } catch (error: any) {
                console.log(error.message);
            } 
        }
        else{
            try {
                const response = await fetch(
                    `${BaseURL()}/get_processos_responsavelNome/${id}`
                );
                const jsonData = await response.json();

                // console.log(jsonData)
                setProcesso(jsonData);
                // console.log(processos)
            } catch (error: any) {
                console.log(error.message);
            }
        }
    };

    //[] como segundo argumento impede de fazer request 24/7, fazendo apenas uma request
    useEffect(() => {
        get_processos_responsavelNome();
    }, []);

    //desabilitar botão para CB
    const [validaEdicao, setValidaEdicao] = useState(validarEdicao('MyProjects',0))

    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{ gap: 3 }}
            justifyContent="center"
        >
            <Paper
                sx={{
                    mt: 3,
                    padding: 3,
                    borderRadius: 5,
                    width: "fit-content",
                    height: "fit-content",
                    gap: 2,
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "70%",
                    maxHeight: "50%",
                    marginTop: "4%",
                }}
            >
                <Box
                    display="flex"
                    alignItems="flex-start"
                    maxHeight="100vh"
                    flexDirection="row"
                    sx={{ gap: 70 }}
                >
                    <div className="divBox">
                        <Typography color="primary" fontFamily="poppins" fontWeight="bold" fontSize="1.8rem" marginLeft='0.8em' marginBottom='0.2em'>
                            Seus Processos
                        </Typography>
                    </div>

                    {/* <BasicSelect></BasicSelect> */}
                </Box>

                <Box
                    sx={{
                        height: "50vh",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Grid
                        item
                        display="flex"
                        flexDirection={"row"}
                        flexWrap={"wrap"}
                        gap={3}
                        marginLeft={3}
                    >
                        {processos.map((processos) => (
                            <CardProcesso
                                processoID={processos.processo_id}
                                name={processos.processo_nome}
                                // anexo={processo.anexo}
                                resp={processos.processo_responsavel_nome}
                            />
                        ))}
                    </Grid>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center" fontFamily="poppins">
                    <Button
                        component={Link}
                        to="/NovoProjeto"
                        variant="contained"
                        disableElevation
                        style={{fontFamily: 'poppins', fontWeight:'bold', fontSize:'1em', marginTop:'0.7em'}}
                        sx={{display: validaEdicao ? "none" : "flex"}}
                    >
                        + Criar Processo
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};
