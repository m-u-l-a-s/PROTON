import { useTheme } from "@emotion/react";
import { Box, Button, Divider, Grid, ListItem, ListItemButton, ListItemText, Paper, TextField, Typography } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from 'react-router-dom';



import {Steps} from "./Steps";
import React, { useEffect, useState } from 'react';

    



export const NovoProjeto = () => {

    const [etapa,setEtapa] = useState([
        {etapa_nome:"Etapa 1", etapa_ordem: "Pendente", desc: "descrição bla bla bla"},
        {etapa_nome:"Etapa 2", etapa_ordem: "Concluida", desc: "descrição bla bla bla"},
        {etapa_nome:"Etapa 3", etapa_ordem: "Pendente", desc: "descrição bla bla bla"},
    ])

    const get_etapa = async () => {
        try {
            const response = await fetch("http://localhost:5000/get_etapa")
            const jsonData = await response.json()

            setEtapa(jsonData)
            console.log(etapa)
        } catch (error:any) {
            console.log(error.message)
        }
    }

    //[] como segundo argumento impede de fazer request 24/7, fazendo apenas uma request
    useEffect(() => {
        get_etapa();
    }, [])

    return (
        // <><Grid display="flex" alignItems="center" justifyContent="center" maxHeight="100vh" sx={{gap:3}}>

        <Box display="flex" alignItems="center" justifyContent="center" maxHeight="100vh"
            flexDirection="column" sx={{ gap: 3 }}>

            <Paper sx={{ mt: 3, padding: 3, borderRadius: 5, width: '1000px', height: '480px', gap: 3 }}>

                <Typography variant="h4" color="primary">Novo Processo</Typography>



                <Box display="flex" alignItems="center" maxHeight="100vh" flexDirection="column">


                    <Box display="flex" flexDirection="column" sx={{ gap: 2 }} >


                        <Grid item>
                            <TextField id="nome-projeto" label="Nome:" variant="standard" sx={{ width: "65vw" }} />

                        </Grid>

                        <Grid item>

                            <TextField id="standard-multiline-static" label="Descrição" multiline rows={2}
                                variant="standard" sx={{ width: "65vw" }} />

                        </Grid>

                        <Grid  >

                              <Box sx={{ height: "27vh", overflowY: 'auto', gap:1}} > 


                                
                                 
                                    
                                   {
                                    etapa.map((etapa) =>(

                                        <Steps
                                        nEtapa={etapa.etapa_nome}
                                        status={etapa.etapa_ordem}
                                        desc={etapa.desc}
                                        
                                        />
                                    ) 
                                    


                                    )


                                   } 
                                    

                              </Box>  




                        </Grid>

                        <Grid item>
                            <Button component={Link} to="/NovaEtapa" variant="contained" disableElevation startIcon={<AddIcon />} sx={{ width: "65vw" }}>Adicionar Etapa</Button>

                        </Grid>


                    </Box>




                    <Box display="flex" flexDirection="row" alignItems="flex-end" sx={{ gap: 72, marginTop: 3 }}>

                        <Button variant="contained" startIcon={<DeleteIcon />} sx={{ background: "#292A2D", color: "white" }}>Descartar</Button>
                        <Button variant="contained" startIcon={<AddIcon />}>Criar Processo</Button>


                    </Box>




                </Box>


            </Paper>


        </Box>

        // </Grid></>












    )


}

