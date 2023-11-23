import {
    Box,
    Button,
    FilledInput,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Paper,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import React, { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomTextField from "../../shared/components/mui/CustomTextField";
import { BaseURL } from "../../control/BaseURL";


export const NovoProjeto = () => {


        //modal de limpar etapa
        const handleClean = () => {
            Swal.fire({
                // title: "Tem certeza que deseja limpar esse processo?",
                title: '<span class="poppins-text" style="font-size: 25px; color:#616161;">Tem certeza que deseja limpar esse processo?</span>',
                customClass: "swalFire",
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:  '<span class="poppins-text" style=" color: black;">Sim</span>',
                confirmButtonColor: "#b6f3f8",
                cancelButtonText: '<span class="poppins-text" style=" color: white;">Não</span>',
            }).then((result: any) => {
                if (result.isConfirmed) {
                    LimparEtapas();
                    Swal.fire({
                        title: '<span class="poppins-text" style="font-size: 25px; color:#616161;">EProcesso limpa com sucesso!</span>',
                        customClass: "swalFire",
                        confirmButtonText: '<span style=" color: black; fontFamily: Poppins">OK</span>',
                        confirmButtonColor: "#b6f3f8",
                    });
                }
            });
        };
    
        //função de limpar etapa
        const LimparEtapas = () => {
            setProcesso_nome("");
            setProcesso_descricao("");
        };




    const styles = {
        label: {
            fontSize: "1.6rem",
            color: "#B6F3F8",
            fontFamily: "Poppins",
        },
        input: {
            fontSize: "1.3rem",
            color: "white",
            padding: "10px",
            fontFamily: "Poppins",
        },
    };

    const navigate = useNavigate();
    const [processo_responsavel_id, setProcesso_responsavel_id] = useState("");
    const [processo_nome, setProcesso_nome] = useState("");
    const [processo_descricao, setProcesso_descricao] = useState("");

    useEffect(() => {
        async function fetchUserId(nome: any) {
            try {
                const response = await fetch(
                    `${BaseURL()}/get_usuario_id/${nome}`,
                    {
                        method: "GET",
                    }
                );
                if (response.status === 200) {
                    const data = await response.json();
                    if (data) {
                        console.log(data);
                        setProcesso_responsavel_id(data);
                    }
                }
            } catch (error: any) {
                console.error(error.message);
            }
        }

        let nome = document.getElementById("currentUserText")?.textContent;
        if (nome !== undefined && nome !== null) {
            nome = nome.substring(5)
        }
        console.log(nome);
        fetchUserId(nome);
    }, []);

    const inserirProcesso = async () => {
        try {
            const body = {
                processo_responsavel_id,
                processo_nome,
                processo_descricao,
            };
            const response = await fetch(
                `${BaseURL()}/insert_processo`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );

            if (response.status === 200) {
                navigate("/MyProjects");
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    //modal de salvar projeto
    const handleAdd = () => {
        Swal.fire({
            title: '<span class="poppins-text" style="font-size: 25px;">Tem certeza que deseja criar esse projeto?</span>',
            customClass: "swalFire",
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<span class="poppins-text" style=" color: black;">Sim</span>',
            confirmButtonColor: "#b6f3f8",
            cancelButtonText: '<span class="poppins-text" style=" color: white">Não</span>',
        }).then((result: any) => {
            if (result.isConfirmed) {
                inserirProcesso();
            }
            if (result.isConfirmed) {
                Swal.fire({
                    title: '<span class="poppins-text" style="font-size: 25px;">Processo criado com sucesso!</span>',
                    customClass: "swalFire",
                    confirmButtonText: '<span class="poppins-text" style="font-size: 15px; color: black;">OK</span>',
                    confirmButtonColor: "#b6f3f8",
                });
            }
        });
    };

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
                    padding: 7,
                    borderRadius: 5,
                    width: "fit-content",
                    height: "fit-content",
                    gap: 2,
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    maxWidth: "70%",
                    maxHeight: "50%",
                    marginTop: "5%",
                }}
            >
                <Grid container spacing={3}>
                    <Grid
                        item
                        xs={12}
                        marginLeft={"-0.5rem"}
                        marginTop={"-1.5em"}
                    >
                        <IconButton
                            className="meuBotao"
                            component={Link}
                            to="/MyProjects"
                        >
                            <ArrowBackRoundedIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12} marginTop={"-1em"}>
                        <Typography
                            variant="h4"
                            color="primary"
                            style={{ fontFamily: "poppins" }}
                        >
                            Novo Processo
                        </Typography>
                    </Grid>

                    <Grid item xs={12} marginTop={"-1em"}>
                        <TextField
                            label="Nome:"
                            id="standard-start-adornment"
                            sx={{ width: "100%" }}
                            value={processo_nome}
                            onChange={(e) => setProcesso_nome(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                ),
                                style: styles.input, // Estilo para o texto digitado
                            }}
                            InputLabelProps={{
                                style: styles.label, // Estilo para a label
                            }}
                            variant="standard"
                        />
                    </Grid>

                    <Grid item xs={12} marginTop={"-1em"}>
                        {/* 
            <TextField
              id="standard-multiline-static"
              label="Descrição"
              multiline
              rows={4}
              variant="standard"
              sx={{ width: '100%' }}
              value={processo_descricao}
              onChange={(e) => setProcesso_descricao(e.target.value)}
            /> */}

                        <TextField
                            id="standard-multiline-static"
                            defaultValue="Default Value"
                            label="Descrição:"
                            variant="standard"
                            multiline
                            rows={2}
                            sx={{ width: "100%" }}
                            value={processo_descricao}
                            onChange={(e) =>
                                setProcesso_descricao(e.target.value)
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                ),
                                style: styles.input, // Estilo para o texto digitado
                            }}
                            InputLabelProps={{
                                style: styles.label, // Estilo para a label
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<ClearIcon />}
                            onClick={handleClean}
                            sx={{
                                background: "#292A2D",
                                color: "white",
                                fontFamily: "poppins",
                                fontSize: "1em",
                                fontWeight: "bold",
                            }}
                        >
                            Limpar Processo
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleAdd}
                            sx={{
                                fontFamily: "poppins",
                                fontSize: "1em",
                                fontWeight: "bold",
                            }}
                        >
                            Salvar Processo
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};
