import { useTheme } from "@emotion/react";
import { Box,  Button,  Grid,  Paper,  TextField,  Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { BarraEtapa} from "../../shared/components";
import {CalendarioEtapa} from "./Calendario";
import "./Style.css"

export const DetalheEtapa = () => {
    const theme = useTheme();

    return (
          <Box display="flex" alignItems="center" justifyContent="center" maxHeight="100vh" flexDirection="column" sx={{gap:3}}>

          <Paper sx={{mt:3, padding:3, borderRadius: 5,  width: '1000px', height: '480px', gap: 3}}>
               <BarraEtapa>

               </BarraEtapa>
            
                    <Box  display="inline-block" alignItems="center"  maxHeight="100vh" flexDirection="column">

                         <Box display="inline-block" flexDirection="column" sx={{gap:3}} textAlign={"left"}>
                              <div className="div1">
                              <Grid item margin={"15px"} marginBottom={"40px"} marginTop={"30px"}>
                                   <TextField id="comentario" label="Deixe um comentário" variant="standard" sx={{width:"24vw"}}  />
                              </Grid>

                              <Grid margin={"15px"} >
                                   <CalendarioEtapa/>
                              </Grid>

                              <Grid margin={"15px"}>
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
                              </Grid>
                              </div>
                                   
                              <div className="div2">
                              <Grid item margin={"15px"} marginLeft={"100px"} marginTop={"30px"}>
                                   <TextField id="comentario" label="Deixe um comentário" variant="standard" sx={{width:"24vw"}}  />
                              </Grid>
                              </div>
                         </Box>

                    </Box>

          </Paper>         
          </Box>
     )
}
