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
        } catch (error:any) {
            console.log(error)
        }
    }
    useEffect(() => {
        const perfilJSON: any = sessionStorage.getItem('perfil')
        setPerfil(!perfilJSON ? usuario : JSON.parse(perfilJSON))
        //console.log(perfil)
        //console.log(JSON.parse(perfil))
    }, [])
    return (

        <div>
            <Box display="flex" alignItems="center" justifyContent="center" maxHeight="100vh"
                flexDirection="column" gap={theme.spacing(1)} marginTop={theme.spacing(3)}>
                <Paper sx={{ padding: 4.5, borderRadius: 5 }} >
                    <Typography variant="h5" color="primary" fontFamily="poppins">Estimativa das Etapas - {nomePerfil()}</Typography>
                    <Grid container spacing={4} alignItems="center" marginTop={0}>
                        <Grid item>
                            <Card sx={{ minWidth: 180, background: "#B5F8FD", borderRadius: 3 }}>
                                <CardContent sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>


                                    <IconButton aria-label="atrasados">
                                        <ReportGmailerrorredIcon sx={{ width: 38, height: 38, alignItems: "center", color: "black" }} />
                                    </IconButton>

                                    <Typography variant="subtitle1" component="div" fontFamily="poppins">
                                        Atrasados
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
                                        A vencer
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
                                        <RuleIcon sx={{ width: 38, height: 38, alignItems: "center", color: "black" }} />
                                    </IconButton>

                                    <Typography variant="subtitle1" component="div" fontFamily="poppins">
                                        Pendentes
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
                                        <PlaylistAddCheckIcon sx={{ width: 38, height: 38, alignItems: "center", color: "black" }} />
                                    </IconButton>

                                    <Typography variant="subtitle1" component="div" fontFamily="poppins">
                                        Completos
                                    </Typography>
                                    <Typography variant="h4" component="div" fontFamily="poppins">
                                        4
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

                                {/* <Grid item> */}


                                    {/* <Card sx={{ maxWidth: 180, maxHeight: 80, background: "#B5F8FD", borderRadius: 3 }}>
                                        <CardContent sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>

                                            <Typography variant="subtitle1" component="div" > Mais entregas </Typography>
                                            <Typography variant="subtitle2" component="div"> Ana </Typography>


                                        </CardContent>

                                    </Card>
                                </Grid>

                                <Grid item>

                                    <Card sx={{ maxWidth: 180, maxHeight: 80, background: "#B5F8FD", borderRadius: 3 }}>
                                        <CardContent sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>

                                            <Typography variant="subtitle1" component="div"> Menos entregas </Typography>
                                            <Typography variant="subtitle2" component="div"> Ana </Typography>


                                        </CardContent>

                                    </Card>
                                </Grid> */}

                            </Box>

                        </Box>

                    </Grid>

                </Paper>


            </Box>

        </div>




















        // <Box width= "100vw" marginTop={theme.spacing(0)}>
        //     <Container maxWidth= "xl">
        //         <Grid  container direction="column" alignItems="center" justifyContent="center">

        //             <Grid item marginTop={theme.spacing(5)}>

        //                 <Paper  sx={{padding:"1.2em", borderRadius:"28px"}}>

        //                     <Box width={"80vw"} height={"30vh"}>



        //                     </Box>

        //                 </Paper>

        //             </Grid>

        //             <Grid item marginTop={theme.spacing(3)}>

        //                 <Paper  sx={{padding:"1.2em", borderRadius:"28px"}}>

        //                     <Box width={"80vw"} height={"30vh"}>

        //                     </Box>

        //                 </Paper>

        //             </Grid>

        //         </Grid>
        //     </Container>
        // </Box>
    )
}