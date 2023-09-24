import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
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
import { SetStateAction, useState } from "react";

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import VoltarButton from './voltarButton'
// import { ProjectSteps } from "../../shered/components/project_steps/ProjectSteps";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { left } from "@popperjs/core";

export const NovaEtapa = () => {
  const theme = useTheme();

  const clicou = () => {
    console.log(etapa_nome);
  };

  const InserirEtapa = async (e: any) => {
    e.preventDefault()
    try {

      const body = { processo_id, etapa_nome, etapa_responsavel_id, etapa_ordem, etapa_data_conclusão, etapa_descricao }
      console.log(body)
      const response = await fetch("http://localhost:5000/insert_etapa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  //Não haverá mais Criador e Envolvidos
  //ID Mockado!!!!
  const [processo_id, setProcessoId] = useState(2)
  const [etapa_nome, setetapa_nome] = useState("");
  //const [Criador, setCriador] = useState("");
  const [etapa_responsavel_id, setetapa_responsavel_id] = useState("");
  const [etapa_data_conclusão, setetapa_data_conclusão] = useState(new Date());
  const [etapa_descricao, setetapa_descricao] = useState("");
  const [etapa_ordem, setetapa_ordem] = useState<number>();

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
          mt: 3,
          padding: 7,
          borderRadius: 5,
          width: 'fit-content',
          height: 'fit-content',
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          maxWidth: '70%',
          maxHeight: '50%',
          marginTop: '3%',
        }}
      >
        <Grid item marginTop={'-1em'}>
          <VoltarButton />
        </Grid>

        <Typography variant="h4" color="primary" borderLeft={'10vw'}>
          Nova Etapa
        </Typography>

        {/* <Box display="flex" alignItems="center" maxHeight="110vh" flexDirection="column"> */}
        <Box display="flex" flexDirection="column" sx={{ gap: 1 }}>
          <Grid item>
            <TextField id="nova-etapa" label="Título:*" variant="standard" sx={{ width: "54.5vw" }}
              value={etapa_nome}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setetapa_nome(e.target.value)}
            />

          </Grid>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px", gap: 3, }}>


              <Grid xs={12}>
                <TextField
                  id="standard-multiline-static-responsavel"
                  label="Responsável:*"
                  variant="standard"
                  sx={{ width: "24.5vw" }}
                  value={etapa_responsavel_id}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setetapa_responsavel_id(e.target.value)}
                />
              </Grid>

              <Grid item width="8rem" marginLeft={'5em'}>

                <TextField
                  id="standard-multiline-static-responsavel"
                  label="Prioridade"
                  variant="standard"
                  sx={{ width: "25vw" }}
                  value={etapa_ordem}
                  // onChange={(e: { target: { value: SetStateAction<string> } }) => setetapa_ordem(e.target.value)}
                  onChange={(e) => setetapa_ordem(Number(e.target.value))}
                />
              </Grid>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontFamily: "Roboto", marginRight: "10px", }}>Prazo de Conclusão: </span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker onChange={(date: any) => setetapa_data_conclusão(date)} />
            </LocalizationProvider>
          </div>

          <div className="descricao">
            <p style={{ color: "black", fontFamily: "Roboto", marginBottom: "10px" }}>Descrição:</p>
          </div>

          <div style={{ display: "flex", flexDirection: "row", borderColor: "white",fontFamily: "Roboto", marginBottom: "10px" }}>
            <Grid>
              <TextField id="standard-multiline-static-responsavel" label="" sx={{ width: "54vw" }}
                value={etapa_descricao}
                onChange={(e: { target: { value: SetStateAction<string> } }) => setetapa_descricao(e.target.value)}
              />
            </Grid>
          </div>


          <Grid item>
            <Box display="flex" flexDirection="row" alignItems="flex-end" sx={{ gap: 80, marginTop: 0 }}>
              <Button variant="contained" startIcon={<DeleteIcon />} sx={{ background: "#292A2D", color: "white" }}>
                Descartar
              </Button>
              <Button variant="contained" startIcon={<AddIcon />} onClick={InserirEtapa}>
                Criar Etapa
              </Button>
            </Box>
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
