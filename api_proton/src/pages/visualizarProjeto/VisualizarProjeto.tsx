import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, Grid, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Steps } from "../novoProjeto/Steps";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Etapa from "../novaEtapa/etapaInterface";
import EtapaAnexos from "../anexos/etapaAnexoInterface";
import { BarraProjeto } from "../../shared/components";
import Swal from "sweetalert2";
import { validarEdicao } from "../../control/validarEdicao";
import { validarStatus } from "../../control/validarStatusEtapa";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CustomTextField from "../../shared/components/mui/CustomTextField";


const VisualizarProjeto = () => {

    const styles = {
        label: {
            fontSize: '1.6rem',
            color: '#B6F3F8',
        },
        input: {
            fontSize: '1.3rem',
            color: 'white',
            padding: '10px',
        },
    };



    const location = useLocation();
    const navigate = useNavigate();

    const [etapa, setEtapa] = useState<Etapa[]>([]);
    const [etapaAnexosData, setEtapaAnexosData] = useState<EtapaAnexos[]>([]);
    const [processo, setProcesso] = useState({
        processo_nome: "",
        processo_descricao: "",
    });

    //Função para validar usuário - libera a edição do texto
    const [validaEdicao, setValidaEdicao] = useState(validarEdicao('VisualizarProjeto'))

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
                    window.location.href = "/MyProjects";
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

    //atualizar modal processo
    const atualizarModalUpdate = () => {
        Swal.fire({
            title: "Tem certeza que deseja atualizar esse processo?",
            customClass: "swalFire",
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<span style="color: black;">Sim</span>',
            confirmButtonColor: "#b6f3f8",
            cancelButtonText: "Não",
        }).then((result: any) => {
            if (result.isConfirmed) {
                editarProcesso(); // Chama a função editar processo
            }
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Processo editado com sucesso!",
                    customClass: "swalFire",
                    confirmButtonText: '<span style="font-size: 15px; color: black;">OK</span>',
                    confirmButtonColor: "#b6f3f8",
                })
            }
        });
    };


    //teste etapa id
    const localizarId = () => {
        console.log(etapa_id)
    }

    //teste conteudo processo
    const testeProcesso = () => {
        console.log(processo)
    }

    //função para edição
    const editarProcesso = async () => {
        //e.preventDefault();
        try {
            const jsl = { processo };

            const processo_nome = jsl.processo.processo_nome
            const processo_descricao = jsl.processo.processo_descricao
            const body = { processo_nome, processo_descricao }

            console.log(body);
            const response = await fetch(`http://localhost:5000/put_processo/${etapa_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    //
    useEffect(() => {
        const fetchData = async () => {
            try {
                const etapaResponse = await fetch(
                    `http://localhost:5000/get_etapa_by_processo/${location.state.id.toString()}`
                );
                const etapaData = await etapaResponse.json();
                setEtapa(etapaData);

                // Busca os anexos e seus contadores para cada etapa
                const etapaAnexosData = await Promise.all(etapaData.map(async (etapaItem: EtapaAnexos) => {
                    const anexosResponse = await fetch(
                        `http://localhost:5000/get_anexos_by_etapa/${etapaItem.etapa_id}`
                    );
                    const anexosData = await anexosResponse.json();
                    return {
                        ...etapaItem,
                        contadorAnexos: anexosData.contador, // Adiciona o contador de anexos
                    };
                }));
                setEtapaAnexosData(etapaAnexosData);

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

    //Função para validar usuário - libera a edição do texto
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setProcesso(prevEtapa => ({
            ...prevEtapa,
            [name]: value
        }));
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
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "70%",
                    maxHeight: "50%",
                    marginTop: "2%",
                }}
            >

                <BarraProjeto processo_nome={processo.processo_nome} navigate={navigate} />

                <Box
                    display="flex"
                    alignItems="center"
                    maxHeight="100vh"
                    flexDirection="column"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        sx={{ gap: 2, marginTop: "-1.25em", marginLeft: "0.5rem", marginRight: "0.5rem" }}
                    >
                        <Grid item>
                            {/* <TextField
                                id="nome-projeto"
                                label="Nome do Projeto"
                                variant="standard"
                                sx={{ width: "50vw", marginTop: "5%", display: validaEdicao ? "none" : "flex" }}
                                value={processo.processo_nome}
                                //validação do usuário
                                name='processo_nome'
                                onChange={handleChange}
                                inputProps={
                                    { readOnly: validaEdicao, }
                                }
                            /> */}


                            <TextField
                                label="Nome do projeto:"
                                id="standard-start-adornment"
                                sx={{ width: "50vw", marginTop: "5%", display: validaEdicao ? "none" : "flex" }}
                                value={processo.processo_nome}
                                onChange={handleChange}
                                inputProps={
                                    { readOnly: validaEdicao, }
                                }
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    style: styles.input, // Estilo para o texto digitado
                                }}
                                InputLabelProps={{
                                    style: styles.label, // Estilo para a label
                                }}
                                variant="standard"
                            />

                        </Grid>
                        <Grid item>
                            {/* <TextField
                                id="standard-multiline-static"
                                label="Descrição do Projeto"
                                multiline
                                rows={2}
                                variant="standard"
                                sx={{ width: "50vw", marginTop: "3%" }}
                                value={processo.processo_descricao}
                                //validação do usuário
                                name='processo_descricao'
                                onChange={handleChange}
                                inputProps={
                                    { readOnly: validaEdicao, }
                                }
                            /> */}

                            <TextField
                                id="standard-multiline-static"
                                defaultValue="Default Value"
                                label="Descrição:"
                                variant="standard"
                                multiline
                                rows={2}
                                sx={{ width: "50vw", marginTop: "3%" }}
                                value={processo.processo_descricao}
                                //validação do usuário
                                name='processo_descricao'
                                onChange={handleChange}
                                inputProps={
                                    { readOnly: validaEdicao, }
                                }
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    style: styles.input, // Estilo para o texto digitado
                                }}
                                InputLabelProps={{
                                    style: styles.label, // Estilo para a label
                                }}
                            />

                        </Grid>

                        <Grid marginBottom='2em'>
                            <Box
                                sx={{
                                    height: "27vh",
                                    overflowY: "auto",
                                    gap: 1,
                                }}
                            >
                                {etapa.map((etapaItem) => {
                                    const anexoData = etapaAnexosData.find(
                                        (anexo) => anexo.etapa_id === etapaItem.etapa_id
                                    );
                                    const contadorAnexos = anexoData?.contadorAnexos || 0;

                                    return (
                                        <Steps
                                            key={etapaItem.etapa_id}
                                            nEtapa={etapaItem.etapa_nome}
                                            status={validarStatus(etapaItem.etapa_status)}
                                            desc={etapaItem.etapa_descricao}
                                            contadorAnexos={contadorAnexos}
                                            etapa_id={etapaItem.etapa_id}
                                        />
                                    );
                                })}
                            </Box>
                        </Grid>





                        <Grid container justifyContent="space-between" sx={{ display: validaEdicao ? "none" : "flex", marginTop:'0em', marginBottom:'0.3em'}}>

                            <Grid item display="flex" flexDirection="row" alignItems="flex-end" sx={{ gap: 80, marginTop: 0 }}>
                                <Button style={{ fontFamily: 'poppins', fontSize: '1em', fontWeight: 'bold' }} startIcon={<DeleteIcon />}
                                    // sx = {{display: validaEdicao ? "none" : "block"}} 
                                    onClick={handleDiscard}>
                                    Deletar Processo
                                </Button>
                            </Grid>
                            <Button style={{ fontFamily: 'poppins', fontSize: '1em', fontWeight: 'bold' }}
                                variant="contained"
                                startIcon={<AddIcon />}
                                // sx={{ width: "50vw", display: validaEdicao ? "none" : "block"}}
                                onClick={handleNavigateToNovaEtapa}
                            >
                                Adicionar Etapa
                            </Button>


                            <Grid item >
                                <Button style={{ fontFamily: 'poppins', fontSize: '1em', fontWeight: 'bold' }} startIcon={<SaveAsIcon />}
                                    //  sx = {{display: validaEdicao ? "none" : "block"}}
                                    onClick={atualizarModalUpdate}>
                                    Salvar Alterações
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
