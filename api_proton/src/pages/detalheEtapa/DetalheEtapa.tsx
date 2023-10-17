import { validarEdicao } from "../../control/validarEdicao";
import { validarMudancaStatus } from "../../control/validarMudancaStatus";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import SaveIcon from '@mui/icons-material/Save';
import { BarraEtapa } from "../../shared/components";
import { CalendarioEtapa } from "./Calendario";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import SaveAsIcon from '@mui/icons-material/SaveAs';

// import Swal from "sweetalert2";
const Swal = require('sweetalert2');

export const DetalheEtapa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataDoBanco, setDataDoBanco] = useState(""); // Inicia como string vazia
  const handleNavigateToProcesso = () => {
    navigate("/visualizarProjeto", { state: { id: etapa.processo_id } });
  };
  const handleNavigateToAnexos = () => {
    navigate('/Anexos', { state: { etapa_id: etapa.etapa_id } });
  };

  const atualizarModal = () => {
    Swal.fire({
      title: "Tem certeza que deseja atualizar esta etapa? Isso excluirá todos os anexos relacionados",
      customClass: "swalFire",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<span style="color: black;">Sim</span>',
      confirmButtonColor: "#b6f3f8",
      cancelButtonText: "Não",
    }).then((result: any) => {
      if (result.isConfirmed) {
        updateEtapa()
        Swal.fire({
          title: "Etapa atualizada com sucesso!",
          customClass: "swalFire",
          confirmButtonText: '<span style="font-size: 15px; color: black;">OK</span>',
          confirmButtonColor: "#b6f3f8",
        });
      }
    });
  };

  // Modal confirmação de deletar
  const deletarModal = () => {
    Swal.fire({
      title: "Tem certeza que deseja deletar esta etapa?",
      customClass: "swalFire",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<span style="color: black;">Sim</span>',
      confirmButtonColor: "#b6f3f8",
      cancelButtonText: "Não",
    }).then((result: any) => {
      if (result.isConfirmed) {
        DeletarEtapa(); // Chama a função deletar etapa sem argumentos
      }
      if (result.isConfirmed) {
        Swal.fire({
          title: "Etapa deletada com sucesso!",
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

  // Estabelecendo a função atualizar etapa
  const updateEtapa = async () => {
    try {
      const body = {
        etapa
      };
      console.log(body);
      const response = await fetch(`http://localhost:5000/put_etapa/${etapa_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // Estabelecendo a função deletar etapa
  const DeletarEtapa = async () => {
    try {
      const body = {
        etapa_id,
      };
      console.log(body);
      const response = await fetch(`http://localhost:5000/deletarEtapa/${etapa_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const [etapa_id, setEtapaId] = useState(location.state.id);
  const theme = useTheme();
  const [validaEdicao, setValidaEdicao] = useState(validarEdicao('DetalheEtapa'))
  const [validaMudancaStatus,setValidaMudancaStatus] = useState(false)
  const [etapa, setEtapa] = useState({
    etapa_id: 1,
    processo_id: 1,
    etapa_nome: "nome mocado",
    etapa_responsavel_id: 1,
    etapa_ordem: 1,
    etapa_data_conclusao: new Date(),
    etapa_descricao: "descrição mocada",
    etapa_status: "N",
    etapa_comentario: "",
  });

  //[] como segundo argumento impede de fazer request 24/7, fazendo apenas uma request
  useEffect(() => {
    const get_etapa_by_id = async () => {
      //Puxando ID da tela anterior
      // console.log(location.state.id)
      const n = location.state.id;
      const idPag = n.toString();
      try {
        const response = await fetch("http://localhost:5000/get_etapa/" + idPag);
        const jsonData = await response.json();
        setEtapa(jsonData); // Update the state with fetched data
        //PUXANDO DATA DO BANCO
        const dataDoBanco = dayjs(jsonData.etapa_data_conclusao, "YYYY-MM-DD").format("DD-MM-YYYY");
        setDataDoBanco(dataDoBanco);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    get_etapa_by_id(); // Call the function inside useEffect
    // You can now safely use the updated 'etapa' state here
    setValidaMudancaStatus(validarMudancaStatus(etapa.etapa_status))
    console.log('EtapaStatus: ' + etapa.etapa_status )
    console.log('booleana: ' + validarMudancaStatus(etapa.etapa_status))
  }, []);

  const [usuario, setUsuario] = useState([
    {
      usuario_id: 1,
      usuario_nome: "Betrano",
      usuario_senha: "senha123",
      usuario_data_cadastro: new Date(),
      usuario_nivel: "CL",
      usuario_email: "betrano@gmail.com",
    },
    {
      usuario_id: 2,
      usuario_nome: "Fulano",
      usuario_senha: "senha456",
      usuario_data_cadastro: new Date(),
      usuario_nivel: "LE",
      usuario_email: "fulano@gmail.com",
    },
  ]);
  const get_usuario = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_usuario/");
      const jsonData = await response.json();
      setUsuario(jsonData); // Update the state with fetched data
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    get_usuario();
  }, []);
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setEtapa(prevEtapa => ({
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
        }}
      >
        <Grid item sx={{ mt: "1em", marginLeft: "1em" }}>
          <IconButton className="meuBotao" onClick={handleNavigateToProcesso}>
            <ArrowBackRoundedIcon />
          </IconButton>
        </Grid>

        <BarraEtapa etapa_nome={etapa.etapa_nome} etapa_id={etapa.etapa_id} />

        {/*</BarraEtapa>*/}

        <Box display="inline-block" alignItems="center" maxHeight="100vh" flexDirection="column">
          <Box display="inline-block" flexDirection="column" sx={{ gap: 3 }} textAlign={"left"}>
            <div className="div1">
              <Grid item margin={"15px"} marginBottom={"40px"} marginTop={"30px"}>
                <TextField
                  id="standard-multiline-static-responsavel"
                  label="Descrição"
                  variant="standard"
                  sx={{ width: "24vw" }}
                  type='text'
                  value={etapa.etapa_descricao}
                  name='etapa_descricao'
                  onChange={handleChange}
                  inputProps={
                    { readOnly: validaEdicao, }
                  }
                />
              </Grid>

              <Grid margin={"15px"}>
                <CalendarioEtapa dataBanco={dataDoBanco} />
              </Grid>

              <Grid item margin={"15px"}>
                {/* <TextField
                                    id="standard-multiline-static-responsavel"
                                    label="Responsável:*"
                                    variant="standard"
                                    value={etapa.etapa_responsavel_id}
                                    sx={{
                                        width: "20vw",
                                        borderBottom: "none",
                                        marginRight: "16px",
                                    }}
                                /> */}

                <InputLabel id="responsavel-label">Responsável</InputLabel>
                <Select
                  labelId="responsavel-label"
                  id="responsavel"
                  value={etapa.etapa_responsavel_id}
                  name='etapa_responsavel_id'
                  onChange={handleChange}
                  inputProps={
                    { readOnly: validaEdicao, }
                  }
                >
                  {usuario.map((usuarioItem) => (
                    <MenuItem value={usuarioItem.usuario_id}>{usuarioItem.usuario_nome}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </div>

            <div className="div2">
              <Grid item margin={"15px"} marginLeft={"100px"} marginTop={"30px"}>
                <TextField
                  id="comentario"
                  label="Deixe um comentário"
                  variant="standard"
                  sx={{ width: "24vw" }}
                  value={etapa.etapa_comentario}
                  name='etapa_comentario'
                  onChange={handleChange}
                  inputProps={
                    { readOnly: validaEdicao, }
                  }
                />
              </Grid>

              {/*Alexandre: Combo dos status que ainda não sei se vou usar depois então deixa aqui */}
              <Grid item margin={"15px"} marginLeft={"100px"} marginTop={"30px"}>
                <InputLabel id="status-label">Status: </InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  value={etapa.etapa_status}
                  name='etapa_status'
                  onChange={handleChange}
                  inputProps={
                    { readOnly: !validaMudancaStatus, }
                  }
                >
                    <MenuItem value={'N'}>Não iniciado</MenuItem>
                    <MenuItem value={'A'}>Em andamento</MenuItem>
                    <MenuItem value={'C'}>Concluído</MenuItem>
                </Select>
                </Grid>
            </div>

            <Grid container display="flex" alignItems="center" justifyContent="space-between" mt={"1.5rem"}>


              <Grid item>

                <Button variant="contained" disableElevation startIcon={<DeleteIcon />}
                  sx={{ background: "#292A2D", color: "white", display: validaEdicao ? "none" : "flex" }}
                  onClick={deletarModal}>
                  Deletar Etapa
                </Button>

              </Grid>

              
              <Grid item>
                  {/*true = invisivel
                  focar em true = visivel
                  qnd edicao for false ou status for true */}
                <Button variant="contained" disableElevation startIcon={<SaveAsIcon />}
                  sx = {{display: !(!validaEdicao || validaMudancaStatus) ? "none" : "flex"}}
                  onClick={atualizarModal}>
                  Salvar Alteração
                </Button>

              </Grid>



            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
