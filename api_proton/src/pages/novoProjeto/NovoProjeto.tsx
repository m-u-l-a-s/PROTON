
import { Box, Button, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';








export const NovoProjeto = () => {



    return (
        // <><Grid display="flex" alignItems="center" justifyContent="center" maxHeight="100vh" sx={{gap:3}}>

        <Box display="flex" alignItems="center" justifyContent="center" maxHeight="100vh"
            flexDirection="column" sx={{ gap: 3 }}>

            <Paper sx={{
                mt: 3,
                padding: 3,
                borderRadius: 5,
                width: 'fit-content',
                height: 'fit-content',
                gap: 2,
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                maxWidth: '70%',
                maxHeight: '50%',
                marginTop: '5%',

                // overflow: "scroll",
                // overflowX: "hidden"


            }}>

                <Grid >

                    <Grid item marginLeft={"-0.5rem"}>

                        <IconButton className="meuBotao" component={Link} to="/MyProjects">
                            <ArrowBackRoundedIcon />
                        </IconButton>
                    </Grid>

                    <Grid item>
                        <Typography variant="h4" color="primary">Novo Processo</Typography>
                    </Grid>

                </Grid>

                <Grid>
                    <Box alignItems="center" maxHeight="100vh" flexDirection="column">


                        <Box display="flex" flexDirection="column" sx={{ gap: 2 }} >


                            <Grid item position="relative">
                                <TextField id="nome-projeto" label="Nome:" variant="standard" sx={{ width: "65vw" }} />

                            </Grid>

                            <Grid item position="relative">

                                <TextField id="standard-multiline-static" label="Descrição" multiline rows={4}
                                    variant="standard" sx={{ width: "65vw" }} />

                            </Grid>





                        </Box>




                        <Box display="flex" flexDirection="row" alignItems="flex-end" sx={{ gap: "36rem", marginTop: "2rem" }}>


                            <Grid item >

                                <Button variant="contained" startIcon={<DeleteIcon />} sx={{ background: "#292A2D", color: "white" }}>Descartar</Button>

                            </Grid>

                            <Grid item >

                                <Button variant="contained" startIcon={<AddIcon />} component={Link} to="/visualizarProjeto">Criar Processo</Button>

                            </Grid>


                        </Box>




                    </Box>
                </Grid>


            </Paper>


        </Box>

        // </Grid></>












    )


}

