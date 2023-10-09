import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { color } from "@mui/system";
import "./NovaEtapa.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import FirstComponent from "./calendario";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SetStateAction, useEffect, useState } from "react";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import VoltarButton from "./voltarButton";
// import { ProjectSteps } from "../../shered/components/project_steps/ProjectSteps";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { left } from "@popperjs/core";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import  SaveIcon from '@mui/icons-material/Save';


export const NovaEtapa = () => {
  const theme = useTheme();
  const location = useLocation();

  //modal de descartar etapa
  const handleDiscard = () => {
    Swal.fire({
      title: "Tem certeza que deseja descartar a etapa?",
      customClass: "swalFire",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<span style="color: black;">Sim</span>',
      confirmButtonColor: "#b6f3f8",
      cancelButtonText: "Não",
    });
  };

  
  //modal de salvar etapa
  const handleAdd = () => {
    Swal.fire({
      title: "Tem certeza que deseja salvar etapa?",
      customClass: "swalFire",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<span style="color: black;">Sim</span>',
      confirmButtonColor: "#b6f3f8",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        InserirEtapa(); // Chama a função sem argumentos
      }
    });
  };
  

  const InserirEtapa = async () => {
    try {
      const body = {
        processo_id,
        etapa_nome,
        etapa_responsavel_id,
        etapa_ordem,
        etapa_data_conclusao,
        etapa_descricao,
      };
      console.log(body);
      const response = await fetch("http://localhost:5000/insert_etapa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const [processo_id, setProcessoId] = useState(location.state.id);
  const [etapa_nome, setetapa_nome] = useState("");
  const [etapa_responsavel_id, setetapa_responsavel_id] = useState("");
  const [etapa_data_conclusao, setetapa_data_conclusao] = useState(new Date());
  const [etapa_descricao, setetapa_descricao] = useState("");
  const [etapa_ordem, setetapa_ordem] = useState<number>();





  //para o combo de responsável funcionar

  const [usuario, setUsuario] = useState([{
    usuario_id: 1,
    usuario_nome: "Betrano",
    usuario_senha: "senha123",
    usuario_data_cadastro: new Date(),
    usuario_nivel: 'CL',
    usuario_email: "betrano@gmail.com"
  },
  {
    usuario_id: 2,
    usuario_nome: "Fulano",
    usuario_senha: "senha456",
    usuario_data_cadastro: new Date(),
    usuario_nivel: 'LE',
    usuario_email: "fulano@gmail.com"
  }]);


  const get_usuario = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/get_usuario/"
      );
      const jsonData = await response.json();
      setUsuario(jsonData); // Update the state with fetched data
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    get_usuario();
  }, []);

  return (
    // // <><Grid display="flex" alignItems="center" justifyContent="center" maxHeight="100vh" sx={{gap:3}}>
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
          // gap: ,
          display: "flex",
          flexDirection: "column",
          maxWidth: "70%",
          maxHeight: "50%",
          marginTop: "2%",
        }}
      >
        <Grid item marginTop={"-1em"}>
          <VoltarButton />
        </Grid>

        <Typography variant="h4" color="primary" borderTop={0}>
          Nova Etapa
        </Typography>

        {/* <Box display="flex" alignItems="center" maxHeight="110vh" flexDirection="column"> */}
        <Box display="flex" flexDirection="column" sx={{ gap: 1 }}>
          <Grid item>
            <TextField
              id="nova-etapa"
              label="Título:*"
              variant="standard"
              sx={{ width: "54.5vw" }}
              value={etapa_nome}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setetapa_nome(e.target.value)}
            />
          </Grid>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
                gap: " 2rem",
              }}
            >
              <Grid xs={12}>
                {/* <TextField
                  id="standard-multiline-static-responsavel"
                  label="Responsável:*"
                  variant="standard"
                  sx={{ width: "20vw" }}
                  value={etapa_responsavel_id}
                  onChange={(e: {
                    target: {
                      value: SetStateAction<string>;
                    };
                  }) => setetapa_responsavel_id(e.target.value)}
                /> */}

                <InputLabel id="responsavel-label">Responsável:</InputLabel>
                <Select
                  labelId="responsavel-label"
                  id="responsavel"
                  value={etapa_responsavel_id}
                  onChange={(e) => setetapa_responsavel_id(e.target.value)}
                >
                  {usuario.map((usuarioItem) => (
                    <MenuItem key={usuarioItem.usuario_id} value={usuarioItem.usuario_id}>
                      {usuarioItem.usuario_nome}
                    </MenuItem>
                  ))}
                </Select>

              </Grid>

              <span
                style={{
                  fontFamily: "Roboto",
                  marginRight: "3 rem ",
                  marginTop: "2rem",
                }}
              >
                Prazo de Conclusão:{" "}
              </span>
                <Grid item mt={"1rem"}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker onChange={(date: any) => setetapa_data_conclusao(date)} />
                  </LocalizationProvider>
                </Grid>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Grid item>
              <p className="legenda">
                A prioridade é definida por números, quanto menor o número maior a prioridade, quanto maior o número
                menor a prioridade.
              </p>
            </Grid>

            <Grid item width="8rem">
              <TextField
                id="standard-multiline-static-responsavel"
                label="Prioridade:*"
                variant="standard"
                sx={{ width: "25vw" }}
                value={etapa_ordem}
                // onChange={(e: { target: { value: SetStateAction<string> } }) => setetapa_ordem(e.target.value)}
                onChange={(e) => setetapa_ordem(Number(e.target.value))}
              />
            </Grid>
          </div>

          <div className="descricao">
            <p
              style={{
                color: "black",
                fontFamily: "Roboto",
                marginBottom: "10px",
              }}
            >
              Descrição:
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              borderColor: "white",
              fontFamily: "Roboto",
              marginBottom: "10px",
            }}
          >
            <Grid>
              <TextField
                id="standard-multiline-static-responsavel"
                label=""
                sx={{ width: "54vw" }}
                value={etapa_descricao}
                onChange={(e: { target: { value: SetStateAction<string> } }) => setetapa_descricao(e.target.value)}
              />
            </Grid>
          </div>

          <Grid container justifyContent="space-between">
            <Grid item display="flex" flexDirection="row" alignItems="flex-end" sx={{ gap: 80, marginTop: 0 }}>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                sx={{ background: "#292A2D", color: "white" }}
                onClick={handleDiscard}
              >
                Descartar
              </Button>
            </Grid>

            <Grid item>
              <Button 
              variant="contained" 
              startIcon={< SaveIcon />}
              onClick={handleAdd}
              >
                Salvar Etapa
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* </Box> */}
      </Paper>
    </Box>

    // </Grid></>

    // <div>
    //   <h1>Sua Página</h1>
    //   {/* ... conteúdo da sua página ... */}
    //   <VoltarButton />
    // </div>
  );
};
