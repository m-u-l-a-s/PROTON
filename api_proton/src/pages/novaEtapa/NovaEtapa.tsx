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
// import { ProjectSteps } from "../../shered/components/project_steps/ProjectSteps";

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
        <Typography variant="h4" color="primary">
          Nova Etapa
        </Typography>

        <Box display="flex" alignItems="center" maxHeight="110vh" flexDirection="column">
          <Box display="flex" flexDirection="column" sx={{ gap: 1 }}>
            <Grid item>
              <TextField id="nova-etapa" label="Título:*" variant="standard" sx={{ width: "50vw" }} 
              value={Título}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setTítulo(e.target.value)}
              />
              
            </Grid>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
                <Grid>
                <TextField
                  id="standard-multiline-static-criador"
                  label="Criador:"
                  variant="standard"
                  sx={{ width: "20vw", borderBottom: "none", marginRight: "16px" }}   
                  value={Criador}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setCriador(e.target.value)}
                />
                  </Grid>

                <Grid>
                <TextField
                  id="standard-multiline-static-responsavel"
                  label="Responsável:*"
                  variant="standard"
                  sx={{ width: "20vw", borderBottom: "none", marginRight: "16px" }}
                  value={Responsável}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setResponsável(e.target.value)}
                />
                </Grid>

                <Grid>
                <TextField
                  id="standard-multiline-static-responsavel"
                  label="Envolvidos:"
                  variant="standard"
                  sx={{ width: "20vw", borderBottom: "10px" }} 
                value={Envolvidos}
                onChange={(e: { target: { value: SetStateAction<string> } }) => setEnvolvidos(e.target.value)}
                />
                </Grid>
                
              </div>

              
                
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <span style={{ marginRight: "10px", fontFamily: "Helvetica" }}>Prazo de conclusão:*</span>
                {/* value={Prazo}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setPrazo(e.target.value)} */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
                
              </div>


              <div className="descricao">
                <p style={{ color: "black" }}>Descrição:</p>
                
              </div>

              <div style={{ display: "flex", flexDirection: "row", borderColor: "white" }}>
                <Grid>
                <TextField id="standard-multiline-static-responsavel" label="" sx={{ width: "50vw" }}
                value={Descricao}
                onChange={(e: { target: { value: SetStateAction<string> } }) => setDescricao(e.target.value)}
                />
                </Grid>
              </div>
            

            <Grid item>
              <Box display="flex" flexDirection="row" alignItems="flex-end" sx={{ gap: 80, marginTop: 4 }}>
                <Button variant="contained" startIcon={<DeleteIcon />} sx={{ background: "#292A2D", color: "white" }}>
                  Descartar
                </Button>
                <Button variant="contained" startIcon={<AddIcon />} onClick={clicou}>
                  Criar Etapa
                </Button>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>

    // </Grid></>
  );
};
