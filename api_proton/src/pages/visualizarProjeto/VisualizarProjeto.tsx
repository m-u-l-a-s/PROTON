import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, Grid, IconButton, Paper, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Steps } from "../novoProjeto/Steps";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import Etapa from "../novaEtapa/etapaInterface";
import { BarraProjeto } from "../../shared/components";
import Swal from "sweetalert2";

const VisualizarProjeto = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [etapa, setEtapa] = useState<Etapa[]>([]);
    const [processo, setProcesso] = useState({
        processo_nome: "",
        processo_descricao: "",
    });


    // Modal confirmação de deletar
    const handleDiscard = () => {
        Swal.fire({
            title: "Tem certeza que deseja deletar todo o processo?",
            customClass: "swalFire",
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<span style="color: black;">Sim</span>',
            confirmButtonColor: "#b6f3f8",
            cancelButtonText: "Não",
        }).then((result: any) => {
            if (result.isConfirmed) {
                DeletarProcesso(); // Chama a função deletar processo sem argumentos
            }
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Processo deletado com sucesso!",
                    customClass: "swalFire",
                    confirmButtonText: '<span style="font-size: 15px; color: black;">OK</span>',
                    confirmButtonColor: "#b6f3f8",
                }).then(() => {
                    // Redirecionar para a página anterior após a confirmação
                    window.history.back();
                });
            }
        });
    };

    // Estabelecendo a função deletar processo
    const DeletarProcesso = async () => {
        try {
            const body = {
                processo,
            };
            console.log(body);
            const response = await fetch(`http://localhost:5000/deletarProcesso/${etapa_id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            console.log(response);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const [etapa_id, setProcessoId] = useState(location.state.id);

    //
    useEffect(() => {
        const fetchData = async () => {
            try {
                const etapaResponse = await fetch(
                    `http://localhost:5000/get_etapa_by_processo/${location.state.id.toString()}`
                );
                const etapaData = await etapaResponse.json();
                setEtapa(etapaData);

                const idProc = location.state.id.toString();
                const processoResponse = await fetch(
                    `http://localhost:5000/get_processo/${idProc}`
                );
                const processoData = await processoResponse.json();
                setProcesso(processoData);
            } catch (error: any) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [location.state.id]);

    const handleNavigateToNovaEtapa = () => {
        navigate("/NovaEtapa", { state: { id: location.state.id } });
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            maxHeight="100vh"
            flexDirection="column"
            sx={{ gap: 3, }}
        >



            <Paper
                sx={{
                    mt: "-3em",
                    padding: 3,
                    borderRadius: 5,
                    width: "fit-content",
                    height: "fit-content",
                    // gap: ,
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "70%",
                    maxHeight: "50%",
                    marginTop: "2%",
                }}
            >

                <BarraProjeto etapa_nome={processo.processo_nome} />

                <Box
                    display="flex"
                    alignItems="center"
                    maxHeight="100vh"
                    flexDirection="column"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        sx={{ gap: 3, marginTop: "-1.75em" }}
                    >
                        <Grid item>
                            <TextField
                                id="nome-projeto"
                                label="Nome do Projeto"
                                variant="standard"
                                sx={{ width: "50vw", marginTop: "5%" }}
                                value={processo.processo_nome}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-multiline-static"
                                label="Descrição do Projeto"
                                multiline
                                rows={2}
                                variant="standard"
                                sx={{ width: "50vw" }}
                                value={processo.processo_descricao}
                            />
                        </Grid>

                        <Grid>
                            <Box
                                sx={{
                                    height: "27vh",
                                    overflowY: "auto",
                                    gap: 1,
                                }}
                            >
                                {etapa.map((etapaItem) => (
                                    <Steps
                                        key={etapaItem.etapa_id}
                                        nEtapa={etapaItem.etapa_nome}
                                        status={etapaItem.etapa_ordem}
                                        desc={etapaItem.etapa_descricao}
                                        etapa_id={etapaItem.etapa_id}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{ width: "50vw" }}
                                onClick={handleNavigateToNovaEtapa}
                            >
                                Adicionar Etapa
                            </Button>
                        </Grid>

                        <Grid container justifyContent="space-between">
                            <Grid item display="flex" flexDirection="row" alignItems="flex-end" sx={{ gap: 80, marginTop: 0 }}>
                                <Button startIcon={<DeleteIcon />} onClick={handleDiscard}>
                                    Deletar Processo
                                </Button>
                            </Grid>

                            <Grid item >
                                <Button startIcon={<EditIcon />}>
                                    Editar Processo
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default VisualizarProjeto;
