import {AppBar, Button, Container, Grid, Stack, Toolbar} from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import {ReactNode} from "react"
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

export const BarraEtapa = (prop:any) =>{
     const theme = useTheme();

     return (
          <AppBar position="static" color="secondary">
               <Container maxWidth="xl">
                    <Toolbar disableGutters>

                         <Grid item width={900} fontFamily={'Poppins, sans-serif'} fontSize={'bold'}>
                                   {prop.etapa_nome}
                         </Grid>

                         <Grid item alignItems={"right"} justifyContent={"flex-start"}>

                              <Stack  direction= "row" spacing={3}>
                                   <Button variant="text" component={Link} to="/Anexos">Anexos</Button>
                              </Stack>
                         </Grid>
                    
                         <Grid item alignItems={"right"} justifyContent={"flex-start"}>
                              <IconButton edge="end" color="inherit" aria-label="menu">
                                   <MoreVertIcon />
                              </IconButton>
                         </Grid>

                    </Toolbar>
               </Container>
          </AppBar>
     );
}
