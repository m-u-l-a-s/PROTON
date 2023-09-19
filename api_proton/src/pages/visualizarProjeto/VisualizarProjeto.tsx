import { useTheme } from "@emotion/react";
import { Box,  Button,  Grid,  Paper,  TextField,  Typography } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

export const VisualizarProjeto = () => {
    const theme = useTheme();

    return (

          <Box display="flex" alignItems="center" justifyContent="center" maxHeight="100vh" flexDirection="column" sx={{gap:3}}>

          <Paper sx={{mt:3, padding:3, borderRadius: 5,  width: '1000px', height: '480px', gap: 3}}>

               <Typography variant="h4" color="primary">Puxar nome do Projeto</Typography>
            
                    <Box  display="flex" alignItems="center"  maxHeight="100vh" flexDirection="column">

                         <Box display="flex" flexDirection="column" sx={{gap:3}} >

                              <Grid item>
                                   <TextField id="nome-projeto" label="Puxar nome" variant="standard" sx={{width:"50vw"}} />
                              </Grid>

                              <Grid item>
                                   <TextField id="standard-multiline-static" label="Puxar descrição" multiline rows={2} variant="standard" sx={{width:"50vw"}} />
                              </Grid>

                              <Grid item>
                                   <Box sx={{bgcolor:"pink", height:"16vh"}} >
                                   <div>puxar infos aqui</div>
                                   </Box>
                              </Grid>

                              <Grid item>
                                   <Button variant="contained" startIcon={<AddIcon />} sx={{width:"50vw"}}>Adicionar Etapa</Button>
                              </Grid>

                         </Box>

                    </Box>

          </Paper>         
          </Box>
     )
}
