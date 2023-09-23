import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { BarraProjeto } from "../../shared/components";
import {Steps} from "../novoProjeto/Steps";
import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

export const VisualizarProjeto = () => {
     const theme = useTheme();
     const location = useLocation();

     const [etapa,setEtapa] = useState([
          {etapa_nome:"Etapa 1", etapa_ordem: "Pendente", desc: "descrição bla bla bla"},
          {etapa_nome:"Etapa 2", etapa_ordem: "Concluida", desc: "descrição bla bla bla"},
          {etapa_nome:"Etapa 3", etapa_ordem: "Pendente", desc: "descrição bla bla bla"},
      ])
  
      const get_etapa = async () => {

          //Puxando ID da tela anterior
          console.log(location.state.id)
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

          <Box display="flex" alignItems="center" justifyContent="center" maxHeight="100vh" flexDirection="column" sx={{ gap: 3 }}>

               <Paper sx={{ mt: 3, padding: 3, borderRadius: 5, width: '1000px', height: '480px', gap: 3 }}>
                    <BarraProjeto>

                    </BarraProjeto>

                    <Box display="flex" alignItems="center" maxHeight="100vh" flexDirection="column">

                         <Box display="flex" flexDirection="column" sx={{ gap: 3 }} >

                              <Grid item>
                                   <TextField id="nome-projeto" label="Puxar nome" variant="standard" sx={{ width: "50vw" }} />
                              </Grid>

                              <Grid item>
                                   <TextField id="standard-multiline-static" label="Puxar descrição" multiline rows={2} variant="standard" sx={{ width: "50vw" }} />
                              </Grid>

                              <Grid >

                                   <Box sx={{ height: "27vh", overflowY: 'auto', gap: 1 }} >





                                        {
                                             etapa.map((etapa) => (

                                                  <Steps
                                                       nEtapa={etapa.etapa_nome}
                                                       status={etapa.etapa_ordem}
                                                       desc={location.state.name}

                                                  />
                                             )



                                             )


                                        }


                                   </Box>

                              </Grid>


                              <Grid item>
                                   <Button variant="contained" startIcon={<AddIcon />} sx={{ width: "50vw" }}>Adicionar Etapa</Button>
                              </Grid>

                         </Box>

                    </Box>

               </Paper>
          </Box>
     )
}
