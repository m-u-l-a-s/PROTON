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

// import { ProjectSteps } from "../../shered/components/project_steps/ProjectSteps";

export const NovaEtapa = () => {
  const theme = useTheme();

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
      <Paper sx={{ mt: 3, padding: 3, borderRadius: 5, width: "1000px", height: "480px", gap: 2 }}>
        <Typography variant="h4" color="primary">
          Nova Etapa
        </Typography>

        <Box display="flex" alignItems="center" maxHeight="110vh" flexDirection="column">
          <Box display="flex" flexDirection="column" sx={{ gap: 2 }}>
            <Grid item>
              <TextField id="nova-etapa" label="Título:*" variant="standard" sx={{ width: "50vw" }} />
            </Grid>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
                <TextField
                  id="standard-multiline-static-criador"
                  label="Criador:"
                  variant="standard"
                  sx={{ width: "20vw", borderBottom: "none", marginRight: "16px" }}
                />
                <TextField
                  id="standard-multiline-static-responsavel"
                  label="Responsável:*"
                  variant="standard"
                  sx={{ width: "20vw", borderBottom: "none", marginRight: "16px" }}
                />
                <TextField
                  id="standard-multiline-static-responsavel"
                  label="Envolvidos:"
                  variant="standard"
                  sx={{ width: "20vw", borderBottom: "none" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <span style={{ marginRight: "10px" }} className="span">
                  Checklist de documentos obrigatórios:
                </span>
                <Button
                  variant="contained"
                  size = "small"
                  style={{
                    borderRadius: "50%",
                    borderColor: "#373737",
                    width: "35px",
                    height: "35px",
                    minWidth: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#616161",
                    border: "2px solid white",
                    cursor: "pointer",
                  }}
                >
                  <AddIcon style={{ fontSize: "20px", color: "#373737" }} />
                </Button>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <span style={{ marginRight: "10px", fontFamily: "Poppins, sans-serif" }}>Prazo de conclusão:*</span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
              </div>

              {/* <div style={ {marginBottom: "10px"}}><p>Prazo de conclusão:*</p></div> */}

              <div style={{ color: "black" }} className="descricao">
                <p>Descrição:</p>
              </div>

              <div style={{ display: "flex", flexDirection: "row", borderColor: "white" }}>
                <TextField id="standard-multiline-static-responsavel" label="" sx={{ width: "50vw" }} />
              </div>
            </div>

            <Grid item>
              <Box display="flex" flexDirection="row" alignItems="flex-end" sx={{ gap: 80, marginTop: 4 }}>
                <Button variant="contained" startIcon={<DeleteIcon />} sx={{ background: "#292A2D", color: "white" }}>
                  Descartar
                </Button>
                <Button variant="contained" startIcon={<AddIcon />}>
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
