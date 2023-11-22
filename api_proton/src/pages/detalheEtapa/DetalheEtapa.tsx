import { validarEdicao } from "../../control/validarEdicao";
import { validarMudancaStatus } from "../../control/validarMudancaStatus";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
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
import CustomTextField from "../../shared/components/mui/CustomTextField";
import { date } from "yup";

// import Swal from "sweetalert2";
const Swal = require('sweetalert2');

export const DetalheEtapa = () => {


  const styles = {
    label: {
      fontSize: '1.6rem',
      color: '#B6F3F8',
      fontFamily: 'Poppins',
    },
    input: {
      fontSize: '1.3rem',
      color: 'white',
      padding: '10px',
      fontFamily: 'Poppins',
    },
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [dataDoBanco, setDataDoBanco] = useState(""); // Inicia como string vazia
  const handleNavigateToProcesso = () => {
    navigate("/visualizarProjeto", { state: { id: etapa.processo_id } });
  };

  const atualizarModal = () => {
    Swal.fire({
      title: '<span class="poppins-text" style="font-size: 25px; color:#616161;">Tem certeza que deseja atualizar esta etapa?</span>',
      customClass: "swalFire",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<span class="poppins-text" style=" color: black;">Sim</span>',
      confirmButtonColor: "#b6f3f8",
      cancelButtonText: '<span class="poppins-text" style=" color: white">Não</span>',
    }).then((result: any) => {
      if (result.isConfirmed) {
        updateEtapa()
        Swal.fire({
          title: '<span class="poppins-text" style="font-size: 25px; color:#616161;">Etapa atualizada com sucesso!</span>',
          customClass: "swalFire",
          confirmButtonText: '<span style=" color: black; fontFamily: Poppins">OK</span>',
          confirmButtonColor: "#b6f3f8",
        }).then(() => {
          // Recarrega a página após o modal ser fechado
          window.location.reload();
        });
        
      }
    });
  };

  // Modal confirmação de deletar
  const deletarModal = () => {
    Swal.fire({
      title: '<span class="poppins-text" style="font-size: 25px; color:#616161;">Tem certeza que deseja deletar esta etapa?</span>',
      customClass: "swalFire",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<span class="poppins-text" style=" color: black;">Sim</span>',
      confirmButtonColor: "#b6f3f8",
      cancelButtonText: '<span class="poppins-text" style=" color: white">Não</span>',
    }).then((result: any) => {
      if (result.isConfirmed) {
        DeletarEtapa(); // Chama a função deletar etapa sem argumentos
      }
      if (result.isConfirmed) {
        Swal.fire({
          title: '<span class="poppins-text" style="font-size: 25px; color:#616161;">Etapa deletada com sucesso!</span>',
          customClass: "swalFire",
          confirmButtonText: '<span style=" color: black; fontFamily: Poppins">OK</span>',
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
  const [validaEdicao, setValidaEdicao] = useState(validarEdicao('DetalheEtapa',location.state.responsavel))
  const [validaMudancaStatus, setValidaMudancaStatus] = useState(false)
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
  const [flag, setFlag] = useState(true)

  //[] como segundo argumento impede de fazer request 24/7, fazendo apenas uma request
  useEffect(() => {
    if (flag) {
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
      setValidaMudancaStatus(validarMudancaStatus(etapa.etapa_status,location.state.responsavel,etapa.etapa_responsavel_id))
    }
  }, [etapa.etapa_status]);


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
      setValidaEdicao(validarEdicao('DetalheEtapa',location.state.responsavel))
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setEtapa(prevEtapa => ({
      ...prevEtapa,
      [name]: value
    }));
    setFlag(false)
  };

  const handleCallback =(valor:Date)=>{
    //console.log(valor)
    const nameDate =  'etapa_data_conclusao';
    setEtapa(prevEtapa => ({
      ...prevEtapa,
      [nameDate]: valor
    }));
    setFlag(false)
  }

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
        mt: "-3em",
        padding: 4,
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
        <Grid item sx={{ mt: "-0.7em", marginLeft: "1em" }}>
          <IconButton className="meuBotao" onClick={handleNavigateToProcesso}>
            <ArrowBackRoundedIcon />
          </IconButton>
        </Grid>

        <BarraEtapa etapa_nome={etapa.etapa_nome} etapa_id={etapa.etapa_id} etapa_responsavel_id = {etapa.etapa_responsavel_id}/>

        {/*</BarraEtapa>*/}

        <Box display="inline-block" alignItems="center" maxHeight="100vh" flexDirection="column">
          <Box display="inline-block" flexDirection="column" sx={{ gap: 2 }} textAlign={"left"}>
            <div className="div1">
              <Grid item margin={"15px"} marginBottom={"40px"} marginTop={"20px"}>
                {/* <TextField
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
                /> */}

                <TextField
                  id="standard-multiline-static"
                  defaultValue="Default Value"
                  label="Descrição:"
                  variant="standard"
                  multiline
                  rows={2}
                  sx={{ width: "24vw" }}
                  type='text'
                  value={etapa.etapa_descricao}
                  name='etapa_descricao'
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

              <Grid margin={"15px"}>
                <CalendarioEtapa dataBanco={dataDoBanco} callback={handleCallback} />
              </Grid>

              <Grid item margin={"15px"}>

                {/* <InputLabel id="responsavel-label" style={{ color: 'white' }}>Responsável</InputLabel>
                <Select
                  labelId="responsavel-label"
                  id="responsavel"
                  style={{ color: 'white' }}
                  value={etapa.etapa_responsavel_id}
                  name='etapa_responsavel_id'
                  onChange={handleChange}
                  inputProps={
                    { readOnly: validaEdicao, }
                  }
                >
                  {usuario.map((usuarioItem) => (
                    <MenuItem style={{ color: 'white' }} value={usuarioItem.usuario_id}>{usuarioItem.usuario_nome}</MenuItem>
                  ))}
                </Select> */}


                <InputLabel
                  htmlFor="responsavel"
                  style={{
                    fontSize: '1.2rem',
                    color: '#B6F3F8',
                    fontFamily: 'Poppins',
                    marginRight: "3rem ",
                    marginTop: "2rem",
                  }}
                >
                  Responsável:
                </InputLabel>
                <Select
                  labelId="responsavel-label"
                  id="responsavel"
                  style={{ color: 'white', fontFamily: 'Poppins', fontSize: '1.2rem',  marginTop:'0.5em'}}
                  value={etapa.etapa_responsavel_id}
                  name = 'etapa_responsavel_id'
                  onChange={handleChange}
                  inputProps={
                    { readOnly: validaEdicao, }
                  }
                >
                  {usuario.map((usuarioItem) => (
                    <MenuItem
                      style={{ color: 'white', fontFamily: 'Poppins', fontSize: '1.2rem' }}
                      value={usuarioItem.usuario_id}>{usuarioItem.usuario_nome}
                    </MenuItem>
                  ))}
                </Select>


              </Grid>
            </div>

            <div className="div2">
              <Grid item margin={"15px"} marginLeft={"100px"} marginTop={"30px"}>
                {/* <TextField
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
                /> */}

                <TextField
                  label="Observações:"
                  id="comentario"
                  sx={{ width: "24vw" }}
                  value={etapa.etapa_comentario}
                  name='etapa_comentario'
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

              {/*Alexandre: Combo dos status que ainda não sei se vou usar depois então deixa aqui */}
              <Grid item margin={"15px"} marginLeft={"100px"} marginTop={"30px"}>
                <InputLabel id="status-label" style={{ color: '#B6F3F8', fontFamily: 'Poppins', fontSize: '1.1rem'}}>Status: </InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  style={{ color: 'white', fontSize: '1.1rem', fontFamily: 'Poppins', marginTop:'0.5em' }}
                  value={etapa.etapa_status}
                  name='etapa_status'
                  onChange={handleChange}
                  inputProps={
                    { readOnly: !validaMudancaStatus, }
                  }
                >
                  <MenuItem style={{ color: 'white', fontSize: '1.1rem', fontFamily: 'Poppins' }} value={'P'}>Pendente</MenuItem>
                  <MenuItem style={{ color: 'white', fontSize: '1.1rem', fontFamily: 'Poppins' }} value={'A'}>Em aprovação</MenuItem>
                  <MenuItem style={{ color: 'white', fontSize: '1.1rem', fontFamily: 'Poppins' }} value={'C'}>Concluído</MenuItem>
                </Select>
              </Grid>
            </div>

            <Grid container display="flex" alignItems="center" justifyContent="space-between" mt={"0.8rem"}>


              <Grid item >

                <Button variant="contained" disableElevation startIcon={<DeleteIcon />}
                  sx={{ marginLeft: '1em', background: "#292A2D", color: "white", display: validaEdicao ? "none" : "flex", fontFamily: 'poppins', fontSize: '1em', fontWeight: 'bold' }}
                  onClick={deletarModal}>
                  Deletar Etapa
                </Button>

              </Grid>


              <Grid item>
                {/*true = invisivel
                  focar em true = visivel
                  qnd edicao for false ou status for true */}
                <Button variant="contained" disableElevation startIcon={<SaveAsIcon /> }
                  sx={{ display: !(!validaEdicao || validaMudancaStatus) ? "none" : "flex", fontFamily: 'poppins', fontSize: '1em', fontWeight: 'bold', marginRight: '-1em' }}
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
