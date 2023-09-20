import { useTheme } from "@emotion/react";
import { Box, Button, Divider, Grid, ListItem, ListItemButton, ListItemText, Paper, TextField, Typography } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';



import {Steps} from "./Steps";


    











export const NovoProjeto = () => {

    const theme = useTheme();


    return (




        // <><Grid display="flex" alignItems="center" justifyContent="center" maxHeight="100vh" sx={{gap:3}}>

        <Box display="flex" alignItems="center" justifyContent="center" maxHeight="100vh"
            flexDirection="column" sx={{ gap: 3 }}>

            <Paper sx={{ mt: 3, padding: 3, borderRadius: 5, width: '1000px', height: '480px', gap: 3 }}>

                <Typography variant="h4" color="primary">Novo Processo</Typography>



                <Box display="flex" alignItems="center" maxHeight="100vh" flexDirection="column">


                    <Box display="flex" flexDirection="column" sx={{ gap: 2 }} >


                        <Grid item>
                            <TextField id="nome-projeto" label="Nome:" variant="standard" sx={{ width: "50vw" }} />

                        </Grid>

                        <Grid item>

                            <TextField id="standard-multiline-static" label="Descrição" multiline rows={2}
                                variant="standard" sx={{ width: "50vw" }} />

                        </Grid>

                        <Grid  >

                              <Box sx={{ height: "26vh", overflowY: 'auto', gap:1}} > 


                                
                                 
                                    
                                   <Steps/>  
                                   <Steps/>  
                                   <Steps/>  
                                   <Steps/>  
                                   <Steps/>  
                                    
                                   




                              </Box>  




                        </Grid>

                        <Grid item>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{ width: "50vw" }}>Adicionar Etapa</Button>

                        </Grid>


                    </Box>




                    <Box display="flex" flexDirection="row" alignItems="flex-end" sx={{ gap: 80, marginTop: 4 }}>

                        <Button variant="contained" startIcon={<DeleteIcon />} sx={{ background: "#292A2D", color: "white" }}>Descartar</Button>
                        <Button variant="contained" startIcon={<AddIcon />}>Criar Processo</Button>


                    </Box>




                </Box>


            </Paper>


        </Box>

        // </Grid></>












    )


}

