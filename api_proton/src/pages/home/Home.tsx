import { Box, Card, CardContent, Grid, IconButton, Paper, Stack, Typography, useTheme, } from "@mui/material"
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import RuleIcon from '@mui/icons-material/Rule';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import GraficoGeral from ".././../shared/charts/GraficoGeral";
import { useEffectSession, useSessionStorageOrDefault } from "../../control/useSessionStorage";
import { useEffect, useState } from "react";


export const Home = () => {
    const theme = useTheme();
    const usuario = [{
        usuario_id: 2,
        usuario_nome: "Fulano",
        usuario_senha: "senha456",
        usuario_data_cadastro: new Date(),
        usuario_nivel: 'LE',
        usuario_email: "fulano@gmail.com"
    }]
    const [perfil, setPerfil] = useState(useSessionStorageOrDefault('perfil', usuario[0]))
    const nomePerfil = () => {
        try {
            return JSON.parse(perfil).usuario_nome
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        const perfilJSON: any = sessionStorage.getItem('perfil')
        setPerfil(!perfilJSON ? usuario : JSON.parse(perfilJSON))
        //console.log(perfil)
        //console.log(JSON.parse(perfil))
        ContarPendentes()
        ContarConcluidos()
        ContarAprovacao()
    }, [])

    // chamando contador de número de etapas pendentes
    const [nEtapasPendentes, setContarPendentes] = useState(0);
    const ContarPendentes = async () => {
        try {
            const nivel = {
                usuario_nivel: 'CL'
            };

            const response = await fetch(
                `http://localhost:5000/contarEtapasPendentes/${JSON.parse(perfil).usuario_id}/${JSON.parse(perfil).usuario_nivel}`

            );
            if (response.ok) {
                const data = await response.json();
                setContarPendentes(data.count);
            } else {
                console.error("Erro na resposta da solicitação:", response);
            }
        } catch (error) {
            console.error("Erro ao buscar o número de etapas:", error);
        };}

    // Chamando contador de número de etapas concluídas
    const [nEtapasConcluidas, setContarConcluidos] = useState(0);
    const ContarConcluidos = async () => {
        try {
            const nivel = {
                usuario_nivel: 'CL'
            };

            const response = await fetch(
                `http://localhost:5000/contarEtapasConcluidas/${JSON.parse(perfil).usuario_id}/${JSON.parse(perfil).usuario_nivel}`

            );
            if (response.ok) {
                const data = await response.json();
                setContarConcluidos(data.count);
            } else {
                console.error("Erro na resposta da solicitação:", response);
            }
        } catch (error) {
            console.error("Erro ao buscar o número de etapas:", error);
        }};

        //contador de etapas em aprovação

        const [nEtapasEmAprocaçao, setContarAprovacao] = useState(0);
        const ContarAprovacao = async () => {
            try {
                const nivel = {
                    usuario_nivel: 'CL'
                };
    
                const response = await fetch(
                    `http://localhost:5000/contarEtapasEmAprovacao/${JSON.parse(perfil).usuario_id}/${JSON.parse(perfil).usuario_nivel}`
    
                );
                if (response.ok) {
                    const data = await response.json();
                    setContarAprovacao(data.count);
                } else {
                    console.error("Erro na resposta da solicitação:", response);
                }
            } catch (error) {
                console.error("Erro ao buscar o número de etapas:", error);
            }};

        return (

            <div>
                <Box display="flex" alignItems="center" justifyContent="center" maxHeight="100vh"
                    flexDirection="column" gap={theme.spacing(1)} marginTop={theme.spacing(3)}>
                    <Paper sx={{ padding: 4.5, borderRadius: 5 }} >
                        <Typography variant="h5" color="primary" fontFamily="poppins">Estimativa dos Processos - {nomePerfil()}</Typography>
                        <Grid container spacing={4} alignItems="center" marginTop={0}>
                            <Grid item>
                                <Card sx={{ minWidth: 180, background: "#B5F8FD", borderRadius: 3 }}>
                                    <CardContent sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>


                                        <IconButton aria-label="atrasados">
                                            <ReportGmailerrorredIcon sx={{ width: 38, height: 38, alignItems: "center", color: "black" }} />
                                        </IconButton>

                                        <Typography variant="subtitle1" component="div" fontFamily="poppins">
                                            Etapas Atrasadas
                                        </Typography>
                                        <Typography variant="h4" component="div" fontFamily="poppins">
                                            4
                                        </Typography>

                                    </CardContent>

                                </Card>

                            </Grid>

                            <Grid item>

                                <Card sx={{ minWidth: 180, background: "#B5F8FD", borderRadius: 3 }}>
                                    <CardContent sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>


                                        <IconButton aria-label="atrasados">
                                            <RunningWithErrorsIcon sx={{ width: 38, height: 38, alignItems: "center", color: "black" }} />
                                        </IconButton>

                                        <Typography variant="subtitle1" component="div" fontFamily="poppins">
                                            Etapas em Aprovação
                                        </Typography>
                                        <Typography variant="h4" component="div" fontFamily="poppins">
                                            {nEtapasEmAprocaçao}
                                        </Typography>

                                    </CardContent>

                                </Card>

                            </Grid>

                            <Grid item>

                                <Card sx={{ minWidth: 180, background: "#B5F8FD", borderRadius: 3 }}>
                                    <CardContent sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>


                                        <IconButton aria-label="atrasados">
                                            <RuleIcon sx={{ width: 38, height: 38, alignItems: "center", color: "black" }} />
                                        </IconButton>

                                        <Typography variant="subtitle1" component="div" fontFamily="poppins">
                                            Etapas Pendentes
                                        </Typography>
                                        <Typography variant="h4" component="div" fontFamily="poppins">
                                            {nEtapasPendentes}
                                        </Typography>

                                    </CardContent>

                                </Card>

                            </Grid>

                            <Grid item>

                                <Card sx={{ minWidth: 180, background: "#B5F8FD", borderRadius: 3 }}>
                                    <CardContent sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>


                                        <IconButton aria-label="atrasados">
                                            <PlaylistAddCheckIcon sx={{ width: 38, height: 38, alignItems: "center", color: "black" }} />
                                        </IconButton>

                                        <Typography variant="subtitle1" component="div" fontFamily="poppins">
                                            Etapas Concluídas
                                        </Typography>
                                        <Typography variant="h4" component="div" fontFamily="poppins">
                                            {nEtapasConcluidas}
                                        </Typography>

                                    </CardContent>

                                </Card>

                            </Grid>


                        </Grid>

                    </Paper>






                    <Paper sx={{ padding: 4, borderRadius: 5, }}>
                        <Typography variant="h5" color="primary" fontFamily="poppins">Visão Geral</Typography>


                        <Grid container spacing={1} alignItems="center" marginTop={1}>

                            <Box display="flex" flexDirection="row" gap={theme.spacing(14)} >

                                <Box display="flex" flexDirection="row" gap={theme.spacing(13)} padding={1}>

                                    <Grid item>

                                        <Paper sx={{ marginBottom: 1, background: "#B5F8FD", borderRadius: 3 }}>
                                            {/* <CardContent sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}> */}

                                            <GraficoGeral />

                                            {/* </CardContent> */}

                                        </Paper>
                                    </Grid>

                                    <Grid item>

                                        <Card sx={{ minWidth: 200, background: "#B5F8FD", borderRadius: 3 }}>
                                            <CardContent sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>


                                                <Typography variant="h5" component="div" fontFamily="poppins">
                                                    Média de
                                                </Typography>

                                                <Typography variant="h2" component="div" fontFamily="poppins">
                                                    44H
                                                </Typography>

                                                <Typography variant="h5" component="div" fontFamily="poppins">
                                                    por projeto
                                                </Typography>

                                            </CardContent>

                                        </Card>
                                    </Grid>

                                </Box>

                                <Box display="flex" flexDirection="column" gap={theme.spacing(2)} marginTop={theme.spacing(1)} padding={0}>

                                </Box>

                            </Box>

                        </Grid>

                    </Paper>


                </Box>

            </div>
        )
    }