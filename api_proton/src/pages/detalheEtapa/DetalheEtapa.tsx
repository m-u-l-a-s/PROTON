import { Link } from 'react-router-dom';
import { useTheme } from "@emotion/react";
import { Box,  Button,  Grid, Paper,  TextField,  Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { BarraEtapa} from "../../shared/components";
import {CalendarioEtapa} from "./Calendario";
import "./Style.css"
import {useLocation} from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export const DetalheEtapa = () => {
    const theme = useTheme();
    const location = useLocation();

    const get_etapa_by_id = async () => {

     //Puxando ID da tela anterior
     console.log(location.state.id)
     try {
         //const response = await fetch("http://localhost:5000/get_etapa")
         //const jsonData = await response.json()

         //setEtapa(jsonData)
         //console.log(etapa)
     } catch (error:any) {
         console.log(error.message)
     }
 }

    //[] como segundo argumento impede de fazer request 24/7, fazendo apenas uma request
    useEffect(() => {
     get_etapa_by_id();
 }, [])

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
                                   id="standard-multiline-static-responsavel"
                                   label="Responsável:*"
                                   variant="standard"
                                   sx={{ width: "20vw", borderBottom: "none", marginRight: "16px" }}
                                   />
                                   
                              </Grid>
                              </div>
                                   
                              <div className="div2">
                              <Grid item margin={"15px"} marginLeft={"100px"} marginTop={"30px"}>
                                   <TextField id="comentario" label="Deixe um comentário" variant="standard" sx={{width:"24vw"}}  />
                              </Grid>

                              <Grid item sx={{mt:"18em", marginLeft:"22em"}}>
                                    <Button   variant="contained" component={Link} to="/visualizarProjeto">Voltar</Button>
                              </Grid>
                              </div>
                         </Box>

                    </Box>

          </Paper>         
          </Box>
     )
}
