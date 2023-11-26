import {
    Box,
    Card,
    CardContent,
    Grid,
    Hidden,
    IconButton,
    Paper,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import RuleIcon from "@mui/icons-material/Rule";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import GraficoGeral from ".././../shared/charts/GraficoGeral";
import {
    useEffectSession,
    useSessionStorageOrDefault,
} from "../../control/useSessionStorage";
import { useEffect, useState } from "react";
import { BaseURL } from "../../control/BaseURL";

type GraficoValores = {
    pendentes: any;
    concluidas: any;
    emAprovacao: any;
    atrasadas: any;
    aVencer: any;
};

export const Home = () => {
    const theme = useTheme();
    const usuario = [
        {
            usuario_id: 2,
            usuario_nome: "Fulano",
            usuario_senha: "senha456",
            usuario_data_cadastro: new Date(),
            usuario_nivel: "LE",
            usuario_email: "fulano@gmail.com",
        },
    ];
    const [perfil, setPerfil] = useState(
        useSessionStorageOrDefault("perfil", usuario[0])
    );
    const nomePerfil = () => {
        try {
            return JSON.parse(perfil).usuario_nome;
        } catch (error: any) {
            console.log(error);
        }
    };
    useEffect(() => {
        const perfilJSON: any = sessionStorage.getItem("perfil");
        setPerfil(!perfilJSON ? usuario : JSON.parse(perfilJSON));
        //console.log(perfil)
        //console.log(JSON.parse(perfil))
        ContarPendentes();
        ContarConcluidos();
        ContarAprovacao();
        ContarAtrasados();
        ContarAVencer();
    }, []);

    // chamando contador de número de etapas pendentes
    const [nEtapasPendentes, setContarPendentes] = useState(0);
    const ContarPendentes = async () => {
        try {
            const usuario_nivel = "CL" || "AD";
            const nivel = {
            usuario_nivel: usuario_nivel
            };

            const response = await fetch(
                `${BaseURL()}/contarEtapasPendentes/${
                    JSON.parse(perfil).usuario_id
                }/${JSON.parse(perfil).usuario_nivel}`
            );
            if (response.ok) {
                const data = await response.json();
                setContarPendentes(data.count);
            } else {
                console.error("Erro na resposta da solicitação:", response);
            }
        } catch (error) {
            console.error("Erro ao buscar o número de etapas:", error);
        }
    };

    // Chamando contador de número de etapas concluídas
    const [nEtapasConcluidas, setContarConcluidos] = useState(0);
    const ContarConcluidos = async () => {
        try {
            const usuario_nivel = "CL" || "AD";
            const nivel = {
            usuario_nivel: usuario_nivel
            };

            const response = await fetch(
                `${BaseURL()}/contarEtapasConcluidas/${
                    JSON.parse(perfil).usuario_id
                }/${JSON.parse(perfil).usuario_nivel}`
            );
            if (response.ok) {
                const data = await response.json();
                setContarConcluidos(data.count);
            } else {
                console.error("Erro na resposta da solicitação:", response);
            }
        } catch (error) {
            console.error("Erro ao buscar o número de etapas:", error);
        }
    };

    //contador de etapas em aprovação
    const [nEtapasEmAprocaçao, setContarAprovacao] = useState(0);
    const ContarAprovacao = async () => {
        try {
            const usuario_nivel = "CL" || "AD";
            const nivel = {
            usuario_nivel: usuario_nivel
            };

            const response = await fetch(
                `${BaseURL()}/contarEtapasEmAprovacao/${
                    JSON.parse(perfil).usuario_id
                }/${JSON.parse(perfil).usuario_nivel}`
            );
            if (response.ok) {
                const data = await response.json();
                setContarAprovacao(data.count);
            } else {
                console.error("Erro na resposta da solicitação:", response);
            }
        } catch (error) {
            console.error("Erro ao buscar o número de etapas:", error);
        }
    };

    // Chamando o contador de etapas atrasadas
    const [nEtapasAtrasadas, setContarAtrasados] = useState(0);
    const ContarAtrasados = async () => {
        try {
            const usuario_nivel = "CL" || "AD";
            const nivel = {
            usuario_nivel: usuario_nivel
            };

            const response = await fetch(
                `${BaseURL()}/contarEtapasAtrasadas/${
                    JSON.parse(perfil).usuario_id
                }/${JSON.parse(perfil).usuario_nivel}`
            );
            if (response.ok) {
                const data = await response.json();
                setContarAtrasados(data.count);
            } else {
                console.error("Erro na resposta da solicitação:", response);
            }
        } catch (error) {
            console.error("Erro ao buscar o número de etapas:", error);
        }
    };

    // Etapas a Vencer
const [nEtapasAVencer, setContarAVencer] = useState(0);

const ContarAVencer = async () => {
    try {
        const usuario_nivel = "CL" || "AD";
        const nivel = {
            usuario_nivel: usuario_nivel
        };

        const response = await fetch(
            `${BaseURL()}/contarEtapasAVencer/${
                JSON.parse(perfil).usuario_id
            }/${nivel.usuario_nivel}`
        );

        if (response.ok) {
            const data = await response.json();
            setContarAVencer(data.count);
        } else {
            console.error("Erro na resposta da solicitação:", response);
        }
    } catch (error) {
        console.error("Erro ao buscar o número de etapas:", error);
    }
};


    //Gráfico
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const atualizarValoresGrafico = () => {
        setValoresParaGrafico({
            pendentes: nEtapasPendentes,
            concluidas: nEtapasConcluidas,
            emAprovacao: nEtapasEmAprocaçao,
            atrasadas: nEtapasAtrasadas,
            aVencer: nEtapasAVencer,
        });
    };

    useEffect(() => {
        atualizarValoresGrafico(); // Atualizar valores do gráfico quando as contagens mudarem
    }, [
        nEtapasPendentes,
        nEtapasConcluidas,
        nEtapasEmAprocaçao,
        nEtapasAtrasadas,
        nEtapasAVencer,
        atualizarValoresGrafico,
    ]);

    const [valoresParaGrafico, setValoresParaGrafico] =
        useState<GraficoValores>({
            pendentes: nEtapasAtrasadas,
            concluidas: nEtapasConcluidas,
            emAprovacao: nEtapasEmAprocaçao,
            atrasadas: nEtapasAtrasadas,
            aVencer: nEtapasAVencer,
        });

    return (
        <div>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                maxHeight="150vh"
                flexDirection="column"
                gap={theme.spacing(1)}
                marginTop={theme.spacing(3)}
            >
                <Paper sx={{ padding: 4.5, borderRadius: 5, marginTop: 3 }}>
                    <Typography
                        variant="h5"
                        color="primary"
                        fontFamily="poppins"
                    >
                        Estimativa dos Processos - {nomePerfil()}
                    </Typography>
                    <Grid
                        container
                        spacing={4}
                        alignItems="center"
                        marginTop={0}
                    >
                        <Grid item>
                            <Card
                                sx={{
                                    minWidth: 180,
                                    background: "#B5F8FD",
                                    borderRadius: 3,
                                }}
                            >
                                <CardContent
                                    sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <ReportGmailerrorredIcon
                                        sx={{
                                            width: 45,
                                            height: 45,
                                            alignItems: "center",
                                            color: "black",
                                        }}
                                    />

                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        fontFamily="poppins"
                                    >
                                        Etapas Atrasadas
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        component="div"
                                        fontFamily="poppins"
                                    >
                                        {nEtapasAtrasadas}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item>
                            <Card
                                sx={{
                                    minWidth: 180,
                                    background: "#B5F8FD",
                                    borderRadius: 3,
                                }}
                            >
                                <CardContent
                                    sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <RunningWithErrorsIcon
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            alignItems: "center",
                                            color: "black",
                                        }}
                                    />

                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        fontFamily="poppins"
                                    >
                                        Etapas A Vencer
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        component="div"
                                        fontFamily="poppins"
                                    >
                                        {nEtapasAVencer}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item>
                            <Card
                                sx={{
                                    minWidth: 180,
                                    background: "#B5F8FD",
                                    borderRadius: 3,
                                }}
                            >
                                <CardContent
                                    sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <SettingsBackupRestoreIcon
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            alignItems: "center",
                                            color: "black",
                                        }}
                                    />

                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        fontFamily="poppins"
                                    >
                                        Etapas Em Aprovação
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        component="div"
                                        fontFamily="poppins"
                                    >
                                        {nEtapasEmAprocaçao}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item>
                            <Card
                                sx={{
                                    minWidth: 180,
                                    background: "#B5F8FD",
                                    borderRadius: 3,
                                }}
                            >
                                <CardContent
                                    sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <RuleIcon
                                        sx={{
                                            width: 45,
                                            height: 45,
                                            alignItems: "center",
                                            color: "black",
                                        }}
                                    />

                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        fontFamily="poppins"
                                    >
                                        Etapas Pendentes
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        component="div"
                                        fontFamily="poppins"
                                    >
                                        {nEtapasPendentes}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item>
                            <Card
                                sx={{
                                    minWidth: 180,
                                    background: "#B5F8FD",
                                    borderRadius: 3,
                                }}
                            >
                                <CardContent
                                    sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <PlaylistAddCheckIcon
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            alignItems: "center",
                                            color: "black",
                                        }}
                                    />

                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        fontFamily="poppins"
                                    >
                                        Etapas Concluídas
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        component="div"
                                        fontFamily="poppins"
                                    >
                                        {nEtapasConcluidas}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper sx={{ padding: 4, borderRadius: 5, width: "67em" }}>
                    <Typography
                        variant="h5"
                        color="primary"
                        fontFamily="poppins"
                        marginLeft={2}
                    >
                        Visão Geral
                    </Typography>

                    <Grid
                        container
                        alignItems="center"
                        marginTop={1}
                        flexDirection={"row"}
                    >
                        {/* <Grid  sx={{margin: 0, padding: 0, alignItems: 'center'}}> */}

                        <GraficoGeral valores={valoresParaGrafico} />

                        {/* </Grid> */}

                        {/* <Grid>

                            <Grid item paddingRight={"5.6em"} >

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
                        </Grid>
 */}
                    </Grid>
                </Paper>
            </Box>
        </div>
    );
};
