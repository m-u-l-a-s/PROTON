import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CardProcesso } from "./CardProcesso";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BasicSelect from "./BasicSelect";

export const MyProjects = () => {
    const [processos, setProcesso] = useState([
        {
            processo_id: 1,
            processo_nome: "Etapa 1",
            processo_descricao: "Pendente",
            processo_responsavel_id: 1,
            processo_responsavel_nome: "Alexandre Jonas",
        },
        {
            processo_id: 2,
            processo_nome: "Etapa 2",
            processo_descricao: "Concluida",
            processo_responsavel_id: 1,
            processo_responsavel_nome: "Alexandre Jonas",
        },
        {
            processo_id: 3,
            processo_nome: "Etapa 3",
            processo_descricao: "Pendente",
            processo_responsavel_id: 1,
            processo_responsavel_nome: "Alexandre Jonas",
        },
    ]);

    const get_processos = async () => {
        try {
            const response = await fetch("http://localhost:5000/get_processos");
            const jsonData = await response.json();

            //console.log(jsonData)
            setProcesso(jsonData);
            //console.log(processos)
        } catch (error: any) {
            console.log(error.message);
        }
    };

    //[] como segundo argumento impede de fazer request 24/7, fazendo apenas uma request
    useEffect(() => {
        get_processos();
    }, []);

    //Puxando nome do responsavel

    const get_processos_responsavelNome = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/get_processos_responsavelNome"
            );
            const jsonData = await response.json();

            //console.log(jsonData)
            setProcesso(jsonData);
            //console.log(processos)
        } catch (error: any) {
            console.log(error.message);
        }
    };

    //[] como segundo argumento impede de fazer request 24/7, fazendo apenas uma request
    useEffect(() => {
        get_processos_responsavelNome();
    }, []);

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
                    marginTop: "5%",
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
                        <Typography variant="h4" color="primary" fontFamily="poppins" fontWeight="bold">
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

                <Box display="flex" alignItems="center" justifyContent="center">
                    <Button
                        component={Link}
                        to="/NovoProjeto"
                        variant="contained"
                        disableElevation
                    >
                        + Criar Processo
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};
