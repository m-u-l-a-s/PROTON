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
    console.log(Título);
  };

  const [Título, setTítulo] = useState("");

  

  const [Criador, setCriador] = useState("");


  const [Responsável, setResponsável] = useState("");

  

  const [Envolvidos, setEnvolvidos] = useState("");


  

  const [Prazo, setPrazo] = useState("");

  

  const [Descricao, setDescricao] = useState("");

  


  return (
    // <><Grid display="flex" alignItems="center" justifyContent="center" maxHeight="100vh" sx={{gap:3}}>

    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      maxHeight="100vh"
      flexDirection="column"
      sx={{ gap: 3 }}
    >
      <Paper sx={{ mt: 3, padding: 3, borderRadius: 5, width: "1000px", height: "480px", gap: 1 }}>
        
        <Grid item >
             <VoltarButton  />
        </Grid>
        <Typography variant="h4" color="primary" borderLeft={'10vw'}>
          Nova Etapa
        </Typography>

        {/* <Box display="flex" alignItems="center" maxHeight="110vh" flexDirection="column"> */}
          <Box display="flex" flexDirection="column" sx={{ gap: 1 }}>
            <Grid item>
              <TextField id="nova-etapa" label="Título:*" variant="standard" sx={{ width: "50vw" }} 
              value={Título}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setTítulo(e.target.value)}
              />
              
            </Grid>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px", gap: 3, }}>
                

                <Grid>
                <TextField
                  id="standard-multiline-static-responsavel"
                  label="Responsável:*"
                  variant="standard"
                  sx={{ width: "21.3vw" }}
                  value={Responsável}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setResponsável(e.target.value)}
                />
                </Grid>

                
                
              </div>

              
                
              </div>

              <div style={{ display: "flex", alignItems: "center"}}>
                <span style={{fontFamily: "Roboto", marginRight:"10px", }}>Prazo de conclusão: </span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
                
              </div>


              <div className="descricao">
                <p style={{ color: "black", fontFamily:"Roboto", marginBottom: "10px" }}>Descrição:</p>
                
              </div>

              <div style={{ display: "flex", flexDirection: "row", borderColor: "white",marginLeft: "-10px", fontFamily:"Roboto", marginBottom:"10px" }}>
                <Grid>
                <TextField id="standard-multiline-static-responsavel" label="" sx={{ width: "50vw" }}
                value={Descricao}
                onChange={(e: { target: { value: SetStateAction<string> } }) => setDescricao(e.target.value)}
                />
                </Grid>
              </div>
            

            <Grid item>
              <Box display="flex" flexDirection="row" alignItems="flex-end" sx={{ gap: 80, marginTop: 0 }}>
                <Button variant="contained" startIcon={<DeleteIcon />} sx={{ background: "#292A2D", color: "white" }}>
                  Descartar
                </Button>
                <Button variant="contained" startIcon={<AddIcon />} onClick={clicou}>
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
